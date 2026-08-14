import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EstimateForm() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setError("");

    if (!pickup.trim() || !dropoff.trim() || !name.trim() || !phone.trim() || !type) {
      setError("Please fill in all the details to get an estimate.");
      return;
    }

    const data = { pickup, dropoff, name, phone, type };
    localStorage.setItem("estimate_data", JSON.stringify(data));
    router.push("/fare-estimate");
  };

  return (
    <div className="estimate-wrapper" style={{ marginTop: '150px', marginBottom: '-120px' }}>
      <div className="estimate-container">
        <div className="estimate-tab">
          <MapPin size={18} className="tab-icon" />
          <span className="tab-text">Indore</span>
          <ChevronDown size={14} className="tab-chevron" />
        </div>
        <div className="estimate-form">
          {error && <div style={{ color: 'red', fontSize: '13px', marginBottom: '12px' }}>{error}</div>}
          <div className="estimate-field">
            <label>Pickup Address <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="Sending From" 
              value={pickup} 
              onChange={(e) => setPickup(e.target.value)} 
            />
          </div>
          <div className="field-divider" />
          
          <div className="estimate-field">
            <label>Drop Address <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="Sending to" 
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
            />
          </div>
          <div className="field-divider" />
          
          <div className="estimate-field">
            <label>Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="Enter your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field-divider" />
          
          <div className="estimate-field">
            <label>Phone Number <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="Enter your Phone Nu..." 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="field-divider" />
          
          <div className="estimate-field select-field">
            <label>What describes you best <span className="text-red-500">*</span></label>
            <div className="select-wrap">
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="" disabled>What Describes You Best?</option>
                <option value="business">Business</option>
                <option value="individual">Individual</option>
              </select>
              <ChevronDown size={14} className="select-chevron" />
            </div>
          </div>
          
          <button onClick={handleSubmit} className="estimate-submit">
            Get Estimate <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
