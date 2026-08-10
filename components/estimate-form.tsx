import { ArrowRight, ChevronDown, MapPin } from "lucide-react";

export function EstimateForm() {
  return (
    <div className="estimate-wrapper">
      <div className="estimate-container">
        <div className="estimate-tab">
          <MapPin size={18} className="tab-icon" />
          <span className="tab-text">Indore</span>
          <ChevronDown size={14} className="tab-chevron" />
        </div>
        <div className="estimate-form">
          <div className="estimate-field">
            <label>Pickup Address <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Sending From" />
          </div>
          <div className="field-divider" />
          
          <div className="estimate-field">
            <label>Drop Address <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Sending to" />
          </div>
          <div className="field-divider" />
          
          <div className="estimate-field">
            <label>Name <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter your Name" />
          </div>
          <div className="field-divider" />
          
          <div className="estimate-field">
            <label>Phone Number <span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter your Phone Nu..." />
          </div>
          <div className="field-divider" />
          
          <div className="estimate-field select-field">
            <label>What describes you best <span className="text-red-500">*</span></label>
            <div className="select-wrap">
              <select defaultValue="">
                <option value="" disabled>What Describes You Best?</option>
                <option value="business">Business</option>
                <option value="individual">Individual</option>
              </select>
              <ChevronDown size={14} className="select-chevron" />
            </div>
          </div>
          
          <button className="estimate-submit">
            Get Estimate <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
