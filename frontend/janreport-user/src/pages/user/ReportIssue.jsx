import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { AlertTriangle, MapPin, Camera } from "lucide-react";
import { useAuthHook } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../context/AuthContext";


// ---- constants ----
const ISSUE_CATEGORIES = [
  "Infrastructure",
  "Water Supply",
  "Drainage / Sewage",
  "Public Health",
  "Street Lighting",
  "Sanitation",
  "Other",
];

// Default center (Hyderabad-ish)
const DEFAULT_CENTER = { lat: 17.385, lng: 78.4867 };

// Custom marker icon (so it looks cleaner)
const reportIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -32],
});

/**
 * Internal helper component to handle map clicks.
 */
const MapClickHandler = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const ReportIssue = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getAuthHeaders } = useAuthHook();
  const authed = isAuthenticated();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [wardZone, setWardZone] = useState(""); 

  const [coords, setCoords] = useState(DEFAULT_CENTER);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    title: false,
    category: false,
    description: false,
    location: false,
  });

  // ---- live location search state ----
  const [locationQuery, setLocationQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);

  // ---- validation rules (omitted for brevity) ----
  const isTitleValid = title.trim().length >= 6;
  const isCategoryValid = category !== "";
  const isDescriptionValid = description.trim().length >= 15;
  const isLocationValid = location.trim().length >= 3;

  const formValid =
    isTitleValid && isCategoryValid && isDescriptionValid && isLocationValid;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // ================== GEO HELPERS (Omitted for brevity) ==================

  // [ ... Geocoding logic here: extractWardZone, resolveAddressFromCoords, etc. ]
  const extractWardZone = (address) => {
    if (!address) return "";
    return (
      address.suburb ||
      address.neighbourhood ||
      address.city_district ||
      address.state_district ||
      address.village ||
      address.town ||
      address.city ||
      ""
    );
  };

  const resolveAddressFromCoords = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "JanReport-Client/1.0 (demo@example.com)",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch address");

      const data = await res.json();
      if (data?.display_name) {
        setLocation(data.display_name);
        setLocationQuery(data.display_name);
      }
      setWardZone(extractWardZone(data?.address));
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newCoords = { lat: latitude, lng: longitude };
        setCoords(newCoords);
        resolveAddressFromCoords(latitude, longitude);
      },
      (err) => {
        console.error(err);
        alert("Unable to fetch current location. Please allow location access.");
      },
      { enableHighAccuracy: true }
    );
  };


  // ============ LIVE LOCATION AUTOCOMPLETE (Omitted for brevity) ============

  useEffect(() => {
    if (!locationQuery || locationQuery.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const handle = setTimeout(async () => {
      try {
        setIsSearchingLocation(true);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
            locationQuery.trim()
          )}`,
          {
            headers: {
              Accept: "application/json",
              "User-Agent": "JanReport-Client/1.0 (demo@example.com)",
            },
          }
        );

        if (!res.ok) throw new Error("Location search failed");
        const data = await res.json();

        const mapped = (data || []).map((item) => ({
          displayName: item.display_name,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
        }));
        setSuggestions(mapped);
      } catch (err) {
        console.error("Autocomplete error:", err);
      } finally {
        setIsSearchingLocation(false);
      }
    }, 450); // debounce

    return () => clearTimeout(handle);
  }, [locationQuery]);

  const handleSuggestionSelect = (suggestion) => {
    setLocation(suggestion.displayName);
    setLocationQuery(suggestion.displayName);
    setCoords({ lat: suggestion.lat, lng: suggestion.lng });
    setSuggestions([]);
    resolveAddressFromCoords(suggestion.lat, suggestion.lng);
  };


  // ============ FILE UPLOAD HANDLING (Omitted for brevity) ============

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []).slice(0, 4); // max 4
    setFiles(selectedFiles);

    const readers = selectedFiles.map(
      (file) =>
        new Promise((resolve) => {
          const r = new FileReader();
          r.onload = () => resolve(r.result);
          r.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((results) => setPreviews(results));
  };


  // ============ SUBMIT HANDLER (Omitted for brevity) ============

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!authed) {
    toast.error("Please sign in to submit your issue.");
    navigate("/login", { state: { from: "/report-issue" } });
    return;
  }

  if (!formValid || submitting) return;

  setSubmitting(true);

  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("wardZone", wardZone || "");
    formData.append("latitude", coords.lat);
    formData.append("longitude", coords.lng);

    files.forEach((file) => {
      formData.append("images", file);
    });

    await axios.post(
      `${API_BASE_URL}/api/issues`,
      formData,
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Issue reported successfully");

    // reset form
    setTitle("");
    setCategory("");
    setDescription("");
    setLocation("");
    setLocationQuery("");
    setWardZone("");
    setFiles([]);
    setPreviews([]);
    setTouched({
      title: false,
      category: false,
      description: false,
      location: false,
    });
    setCoords(DEFAULT_CENTER);

    navigate("/user/dashboard"); // or wherever you want
  } catch (err) {
    console.error(err);
    toast.error(
      err.response?.data?.message ||
      "Failed to submit issue. Please try again."
    );
  } finally {
    setSubmitting(false);
  }
};


  const handleMapSelect = ({ lat, lng }) => {
    const newCoords = { lat, lng };
    setCoords(newCoords);
    resolveAddressFromCoords(lat, lng);
  };

  return (
    // PROFESSIONAL STYLING: Use the .auth-page class for background and padding
    <main className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Use the base .card class for automatic theme styling */}
            <div className="card shadow-lg" style={{ borderRadius: "1.25rem" /* Retained large radius */ }}>
              <div className="card-body p-4 p-md-5">
                {/* Header */}
                <div className="d-flex align-items-center mb-4">
                  {/* Icon Circle: Theme-aware styling */}
                  <div className="me-3 rounded-circle d-flex align-items-center justify-content-center"
                       style={{ 
                          width: 48, 
                          height: 48,
                          backgroundColor: 'var(--color-bg-secondary)', // Subtle secondary color
                          color: 'var(--color-accent)' // Primary accent for icon
                       }}>
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h4 className="mb-1 auth-title">Report a Civic Issue</h4>
                    <small className="text-muted">
                      Provide clear details so your MLA / MP and officials can act quickly.
                    </small>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* TITLE */}
                  <div className="mb-3">
                    <label className="form-label">
                      Issue Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        touched.title && !isTitleValid ? "is-invalid" : ""
                      }`}
                      placeholder="e.g., Broken bridge connecting two mandals"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={() => handleBlur("title")}
                    />
                    {touched.title && !isTitleValid && (
                      <div className="invalid-feedback">
                        Title should be at least 6 characters.
                      </div>
                    )}
                  </div>

                  {/* CATEGORY */}
                  <div className="mb-3">
                    <label className="form-label">
                      Category <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${
                        touched.category && !isCategoryValid ? "is-invalid" : ""
                      }`}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      onBlur={() => handleBlur("category")}
                    >
                      <option value="">Select category</option>
                      {ISSUE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {touched.category && !isCategoryValid && (
                      <div className="invalid-feedback">
                        Please select an issue category.
                      </div>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mb-3">
                    <label className="form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className={`form-control ${
                        touched.description && !isDescriptionValid
                          ? "is-invalid"
                          : ""
                      }`}
                      rows="5"
                      placeholder="Describe what is happening, how often, and how it affects people."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      onBlur={() => handleBlur("description")}
                    />
                    {touched.description && !isDescriptionValid && (
                      <div className="invalid-feedback">
                        Please provide at least 15 characters of description.
                      </div>
                    )}
                  </div>

                  {/* LOCATION + AUTOCOMPLETE + CURRENT LOCATION */}
                  <div className="mb-3 position-relative">
                    <label className="form-label">
                      Location / Landmark <span className="text-danger">*</span>
                    </label>
                    {/* Input Group: Ensures the MapPin icon is theme-aware */}
                    <div className="input-group">
                      <span className="input-group-text" 
                            style={{ backgroundColor: 'var(--color-input-bg)', borderColor: 'inherit', color: 'var(--color-text-muted)' }}>
                        <MapPin size={16} />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${
                          touched.location && !isLocationValid
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Type address or use the map / current location"
                        value={location}
                        onChange={(e) => {
                          const value = e.target.value;
                          setLocation(value);
                          setLocationQuery(value); // triggers autocomplete
                        }}
                        onBlur={() => handleBlur("location")}
                      />
                      {/* Button uses the theme-aware btn-outline-primary style */}
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleUseCurrentLocation}
                      >
                        Use My Current Location
                      </button>
                    </div>
                    {touched.location && !isLocationValid && (
                      <div className="invalid-feedback d-block">
                        Please provide a valid location or landmark.
                      </div>
                    )}

                    {/* Autocomplete Dropdown: Theme-aware styling */}
                    {locationQuery.trim().length >= 3 &&
                      suggestions.length > 0 && (
                        <div
                          className="list-group position-absolute w-100 shadow-sm mt-1 z-3"
                          style={{ maxHeight: 220, overflowY: "auto" }}
                        >
                          {suggestions.map((s, idx) => (
                            <button
                              type="button"
                              key={`${s.displayName}-${idx}`}
                              className="list-group-item list-group-item-action small"
                              style={{ 
                                background: 'var(--color-card-bg)', 
                                color: 'var(--color-text)', 
                                border: '1px solid var(--color-card-border)' 
                              }}
                              onMouseDown={() => handleSuggestionSelect(s)}
                            >
                              {s.displayName}
                            </button>
                          ))}
                          {isSearchingLocation && (
                            <div className="list-group-item small text-muted">
                              Searching…
                            </div>
                          )}
                        </div>
                      )}
                  </div>

                  {/* AUTO-DETECTED WARD / ZONE */}
                  {wardZone && (
                    <div className="mb-3">
                      <label className="form-label">Detected Area / Ward</label>
                      <input
                        type="text"
                        className="form-control"
                        value={wardZone}
                        readOnly
                      />
                      <small className="text-muted">
                        Auto-detected from the map location. Helps route your
                        issue to the correct local body.
                      </small>
                    </div>
                  )}

                  {/* MAP PICKER */}
                  <div className="mb-4">
                    <label className="form-label">
                      Pick Location on Map (optional)
                    </label>
                    <div
                      className="border shadow-sm"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                        borderColor: 'var(--color-card-border)',
                      }}
                    >
                      <MapContainer
                        center={
                          coords
                            ? [coords.lat, coords.lng]
                            : [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng]
                        }
                        zoom={12}
                        style={{ height: "300px", width: "100%" }}
                        scrollWheelZoom={false}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
                          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        />

                        {/* draggable marker */}
                        <Marker
                          position={[coords.lat, coords.lng]}
                          draggable
                          icon={reportIcon}
                          eventHandlers={{
                            dragend: (e) => {
                              const { lat, lng } = e.target.getLatLng();
                              handleMapSelect({ lat, lng });
                            },
                          }}
                        />

                        {/* map click handler */}
                        <MapClickHandler onSelect={handleMapSelect} />
                      </MapContainer>
                    </div>
                  </div>

                  {/* PHOTOS */}
                  <div className="mb-4">
                    <label className="form-label">Photos (optional)</label>
                    {/* Input Group: Ensures the Camera icon is theme-aware */}
                    <div className="input-group">
                      <span className="input-group-text"
                            style={{ backgroundColor: 'var(--color-input-bg)', borderColor: 'inherit', color: 'var(--color-text-muted)' }}>
                        <Camera size={16} />
                      </span>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                      />
                    </div>
                    {previews.length > 0 && (
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {previews.map((src, idx) => (
                          <div
                            key={idx}
                            className="border rounded"
                            style={{
                              width: 70,
                              height: 70,
                              overflow: "hidden",
                              backgroundColor: 'var(--color-bg-secondary)', 
                              borderColor: 'var(--color-card-border)'
                            }}
                          >
                            <img
                              src={src}
                              alt={`preview-${idx}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <small className="text-muted d-block mt-1">
                      You can attach up to 4 images (damage, surroundings, etc.).
                    </small>
                  </div>

                  {/* FOOTER */}
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                    <small className="text-muted">
                      Fields marked <span className="text-danger">*</span> are required.
                    </small>
                    <button
                      type="submit"
                      className="btn btn-primary px-4"
                      disabled={!formValid || submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Issue"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportIssue;