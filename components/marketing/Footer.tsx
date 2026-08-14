import { LogoMark } from "../navbar";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a className="brand footer-brand" href="#top">
              <LogoMark />
              <span>
                Patel <b>Technology</b>
              </span>
            </a>
            <p>
              Technology-led logistics
              <br />
              for the way business moves.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <b>Company</b>
              <a href="#about">About us</a>
              <a href="#contact">Careers</a>
              <a href="#contact">Contact</a>
            </div>
            <div>
              <b>Solutions</b>
              <a href="#services">Delivery</a>
              <a href="#services">B2B logistics</a>
              <a href="#services">Platform</a>
            </div>
            <div>
              <b>Connect</b>
              <a href="mailto:hello@pateltechnology.in">Email us</a>
              <a href="#contact">LinkedIn</a>
              <a href="#contact">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Patel Technology. All rights reserved.</span>
          <span>
            Made for the move <span className="orange-heart">●</span>
          </span>
          <span>
            <a href="#contact">Privacy</a> · <a href="#contact">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
