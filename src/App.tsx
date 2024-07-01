import "./App.css";
import { useState } from "react";
import Card from "./card.tsx";
import ListGroup from "./ListGroup.tsx";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState("No Selected Plan");
  const [selectedPlanTouched, setSelectedPlanTouched] = useState(false);
  const [planPrice, setPlanPrice] = useState(0);

  const [onlineAddOn, setOnlineAddOn] = useState(false);
  const [largerAddOn, setLargerAddOn] = useState(false);
  const [customizableAddOn, setCustomizableAddOn] = useState(false);

  const [period, setPeriod] = useState("Monthly");

  let totalPerPeriod =
    period === "Yearly"
      ? planPrice +
        (onlineAddOn ? 12 : 0) +
        (largerAddOn ? 24 : 0) +
        (customizableAddOn ? 24 : 0)
      : planPrice +
        (onlineAddOn ? 1 : 0) +
        (largerAddOn ? 2 : 0) +
        (customizableAddOn ? 2 : 0);

  const submitForm = () => {
    const submit = new CustomEvent("submitForm", {
      detail: [name, email, phone, selectedPlan, period, totalPerPeriod],
    });
    window.dispatchEvent(submit);
  };

  const checkEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setEmail(email);
    setEmailValid(emailRegex.test(email));
  };

  const checkValidNumber = (phone: string) => {
    const phoneRegex = /^(09|\+639)\d{9}$/;
    setPhone(phone);
    setPhoneValid(phoneRegex.test(phone));
  };

  const handleNumberWarning = () => {
    if (!phone) return "This Field Is Required";
    if (!phoneValid) return "Please enter a valid phone number";
  };
  const handleEmailWarning = () => {
    if (!email) return "This Field Is Required";
    if (!emailValid) return "Please enter a valid email";
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (name && emailValid && phone) setCurrentStep(currentStep + 1);
      else {
        setNameTouched(true);
        setEmailTouched(true);
        setPhoneTouched(true);
      }
    } else if (currentStep === 2) {
      if (selectedPlan !== "No Selected Plan") {
        setCurrentStep(currentStep + 1);
      } else {
        setSelectedPlanTouched(true);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className={`sidebar-item ${currentStep === 1 ? "active" : ""}`}>
            <div className="step-counter">1</div>
            <div className="sidebar-item-text-container">
              <h6>STEP 1</h6>
              <p>YOUR INFO</p>
            </div>
          </div>
          <div className={`sidebar-item ${currentStep === 2 ? "active" : ""}`}>
            <div className="step-counter">2</div>
            <div className="sidebar-item-text-container">
              <h6>STEP 2</h6>
              <p>SELECT PLAN</p>
            </div>
          </div>
          <div className={`sidebar-item ${currentStep === 3 ? "active" : ""}`}>
            <div className="step-counter">3</div>
            <div className="sidebar-item-text-container">
              <h6>STEP 3</h6>
              <p>ADD-ONS</p>
            </div>
          </div>
          <div className={`sidebar-item ${currentStep === 4 ? "active" : ""}`}>
            <div className="step-counter">4</div>
            <div className="sidebar-item-text-container">
              <h6>STEP 4</h6>
              <p>SUMMARY</p>
            </div>
          </div>
        </div>
        <div className="step-content">
          {currentStep === 1 && (
            <>
              <div className="step-header">
                <h2>Personal info</h2>
                <p>
                  Please provide your name, email address, and phone number.
                </p>
              </div>
              <div className="step-field">
                <div className="step-labels">
                  <label htmlFor="name-field" className="field-label">
                    Name
                  </label>
                  {nameTouched && !name && (
                    <label htmlFor="name-field" className="required-field">
                      This Field Is Required
                    </label>
                  )}
                </div>
                <input
                  id="name-field"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="name-field"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameTouched(true);
                  }}
                />
              </div>
              <div className="step-field">
                <div className="step-labels">
                  <label htmlFor="email-field" className="field-label">
                    Email Address
                  </label>
                  {emailTouched && (
                    <label htmlFor="email-field" className="required-field">
                      <span className="email-warning">
                        {handleEmailWarning()}
                      </span>
                    </label>
                  )}
                </div>
                <input
                  id="email-field"
                  type="email"
                  className="form-control"
                  placeholder="Example@email.com"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="email-field"
                  value={email}
                  onChange={(e) => {
                    checkEmail(e.target.value);
                    setEmailTouched(true);
                  }}
                />
              </div>
              <div className="step-field">
                <div className="step-labels">
                  <label htmlFor="phone-number-field" className="field-label">
                    Phone Number
                  </label>
                  {phoneTouched && (
                    <label
                      htmlFor="phone-number-field"
                      className="required-field"
                    >
                      {handleNumberWarning()}
                    </label>
                  )}
                </div>
                <input
                  id="step-field"
                  type="text"
                  className="form-control"
                  placeholder="+639 12 345 6789"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="phone-number-field"
                  value={phone}
                  onChange={(e) => {
                    setPhoneTouched(true);
                    checkValidNumber(e.target.value);
                  }}
                />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="step-header">
                <h2>Select Your Plan</h2>
                <p>You have the option of monthly or yearly billing</p>
              </div>
              <div>
                {selectedPlan === "No Selected Plan" && selectedPlanTouched && (
                  <label className="required-field">
                    This Field Is Required
                  </label>
                )}
              </div>
              <div className="step-field">
                <div className="card-selector">
                  <Card
                    image="./assets/images/icon-arcade.svg"
                    header="Arcade"
                    subheader={`$${period === "Yearly" ? 9 * 12 : 9}/${
                      period === "Yearly" ? "yr" : "mo"
                    }`}
                    style={
                      selectedPlan === "Arcade"
                        ? { border: "2px solid #2D9CDB" }
                        : {}
                    }
                    onClick={() => {
                      setSelectedPlan("Arcade");
                      setPlanPrice(period === "Yearly" ? 9 * 12 : 9);
                      setSelectedPlanTouched(true);
                    }}
                    isYearly={period === "Yearly" ? true : false}
                  ></Card>
                  <Card
                    image="./assets/images/icon-advanced.svg"
                    header="Advanced"
                    subheader={`$${period === "Yearly" ? 12 * 12 : 12}/${
                      period === "Yearly" ? "yr" : "mo"
                    }`}
                    style={
                      selectedPlan === "Advanced"
                        ? { border: "2px solid #2D9CDB" }
                        : {}
                    }
                    onClick={() => {
                      setSelectedPlan("Advanced");
                      setPlanPrice(period === "Yearly" ? 12 * 12 : 12);
                      setSelectedPlanTouched(true);
                    }}
                    isYearly={period === "Yearly" ? true : false}
                  ></Card>
                  <Card
                    image="./assets/images/icon-pro.svg"
                    header="Pro"
                    subheader={`$${period === "Yearly" ? 15 * 12 : 15}/${
                      period === "Yearly" ? "yr" : "mo"
                    }`}
                    style={
                      selectedPlan === "Pro"
                        ? { border: "2px solid #2D9CDB" }
                        : {}
                    }
                    onClick={() => {
                      setSelectedPlan("Pro");
                      setPlanPrice(period === "Yearly" ? 15 * 12 : 15);
                      setSelectedPlanTouched(true);
                    }}
                    isYearly={period === "Yearly" ? true : false}
                  ></Card>
                </div>
                <div className="subscription-type">
                  <p
                    id="monthly"
                    style={
                      period === "Monthly"
                        ? { fontWeight: 700, color: "hsl(213, 96%, 18%)" }
                        : { fontWeight: 500, color: "hsl(231, 11%, 63%)" }
                    }
                  >
                    Monthly
                  </p>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={period === "Yearly"}
                      onChange={() => {
                        setPeriod(period === "Monthly" ? "Yearly" : "Monthly");
                        setPlanPrice(
                          period === "Yearly" ? planPrice / 12 : planPrice * 12
                        );
                        console.log(planPrice);
                      }}
                    />
                  </div>
                  <p
                    id="yearly"
                    style={
                      period === "Yearly"
                        ? { fontWeight: 700, color: "hsl(213, 96%, 18%)" }
                        : { fontWeight: 500, color: "hsl(231, 11%, 63%)" }
                    }
                  >
                    Yearly
                  </p>
                </div>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div className="step-header">
                <h2>Pick add-ons</h2>
                <p>Add-ons help enhance your gaming experience</p>
              </div>

              <ListGroup
                header="Online Service"
                subheader="Access to multiplayer games"
                price={`$${period === "Yearly" ? 1 * 12 : 1}/${
                  period === "Yearly" ? "yr" : "mo"
                }`}
                id="online-service"
                onClick={() => setOnlineAddOn(!onlineAddOn)}
                isChecked={onlineAddOn}
              ></ListGroup>
              <ListGroup
                header="Larger Storage"
                subheader="Extra 1TB of cloud save"
                price={`$${period === "Yearly" ? 2 * 12 : 2}/${
                  period === "Yearly" ? "yr" : "mo"
                }`}
                id="larger-storage"
                onClick={() => setLargerAddOn(!largerAddOn)}
                isChecked={largerAddOn}
              ></ListGroup>
              <ListGroup
                header="Customizable Profile"
                subheader="Custom theme on your profile"
                price={`$${period === "Yearly" ? 2 * 12 : 2}/${
                  period === "Yearly" ? "yr" : "mo"
                }`}
                id="customizable-profile"
                onClick={() => setCustomizableAddOn(!customizableAddOn)}
                isChecked={customizableAddOn}
              ></ListGroup>
            </>
          )}

          {currentStep === 4 && (
            <>
              <div className="step-header">
                <h2>Finishing Up</h2>
                <p>Double-check everything looks OK before confirming</p>
              </div>
              <div className="summary">
                <div className="bill-header">
                  <div className="plan">
                    <p className="plan-selected">
                      {selectedPlan} ({period})
                    </p>
                    <p
                      className="change-plan"
                      onClick={() => setCurrentStep(2)}
                    >
                      Change
                    </p>
                  </div>
                  <div className="bill">
                    <p>
                      ${period === "Yearly" ? planPrice : planPrice}/
                      {period === "Yearly" ? "yr" : "mo"}
                    </p>
                  </div>
                </div>
                {onlineAddOn && (
                  <div className="add-on">
                    <div className="plan">
                      <p className="plan-selected">Online Service</p>
                    </div>
                    <div className="bill">
                      <p>${period === "Yearly" ? "12/yr" : "1/mo"}</p>
                    </div>
                  </div>
                )}
                {largerAddOn && (
                  <div className="add-on">
                    <div className="plan">
                      <p className="plan-selected">Larger Storage</p>
                    </div>
                    <div className="bill">
                      <p>${period === "Yearly" ? "24/yr" : "2/mo"}</p>
                    </div>
                  </div>
                )}
                {customizableAddOn && (
                  <div className="add-on">
                    <div className="plan">
                      <p className="plan-selected">Customizable Profile</p>
                    </div>
                    <div className="bill">
                      <p>${period === "Yearly" ? "24/yr" : "2/mo"}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="total">
                <p className="total-text">
                  Total ({period === "Yearly" ? "per year" : "per month"})
                </p>
                <p className="total-value">
                  {`$${totalPerPeriod}/${period === "Yearly" ? "yr" : "mo"}`}
                </p>
              </div>
            </>
          )}
          {currentStep === 5 && (
            <>
              <div className="step-header thank-you">
                <img src=".\assets\images\icon-thank-you.svg" alt="thank-you" />

                <h2>Thank you!</h2>
                <p>
                  Thanks for confirming your subscription! We hope you have
                  using our platform. If you ever need support, please feel free
                  to email us at support@loremgaming.com.
                </p>
              </div>
            </>
          )}

          {currentStep !== 5 && (
            <div className="button-container">
              {currentStep !== 1 && (
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  style={{
                    backgroundColor: "transparent",
                    color: "hsl(213, 96%, 18%)",
                    display: currentStep === 1 ? "none" : "block",
                  }}
                >
                  Go back
                </button>
              )}

              <button
                className="btn btn-primary"
                onClick={() => {
                  if (currentStep === 4) {
                    submitForm();
                    handleNextStep();
                  } else {
                    handleNextStep();
                  }
                }}
                style={{ marginLeft: "auto" }}
              >
                {currentStep === 4 ? "Submit" : `Next Step`}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
