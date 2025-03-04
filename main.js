const steps = [renderInfoPage,
               renderPlanPage,
               renderAddOnsPage,
               renderSummaryPage,
               renderThankYouPage
              ];

const stepsInfo = [{title: "Personal info",
                    titleDescription: "Please provide your name, email address, and phone number."
                  },
                  {title: "Select your plan",
                    titleDescription: "You have the option of monthly or yearly billing."
                  },
                  {title: "Pick add-ons",
                    titleDescription: "Add-ons help enhance your gaming experience."
                  },
                  {title: "Finishing up",
                    titleDescription: "Double check everything looks OK before confirming."
                  }
                ];

let currentIndex = 0;
let formDetails = {name : "", email: "", number: "",  plan: { type: "Arcade", billing: "monthly", price: 9 }, addOns : []};  

let nextButton = document.getElementById('next-btn');
let backButton = document.getElementById('back-btn');

function showUI() {
   
  if(currentIndex < steps.length-1) {
  let mainBody = document.getElementById('body');
  mainBody.innerHTML = steps[currentIndex]();

  //console.log(mainBody.innerHTML);

  document.querySelectorAll(".circle").forEach((step) => {
    step.style.backgroundColor = "transparent";
    step.style.color = "white";
    step.style.border = "1px solid white";
});

let currentStep = document.querySelector(`.circle[data-index="${currentIndex}"]`);

if (currentStep) {
    currentStep.style.backgroundColor = "hsl(206, 94%, 87%)";
    currentStep.style.color = "black";
    currentStep.style.border = "none";
}
  

    let title = document.getElementById('title');
    title.textContent = stepsInfo[currentIndex].title;
    let titleDescription = document.getElementById('titleDescription');
    titleDescription.textContent = stepsInfo[currentIndex].titleDescription;

   
    backButton.style.display = currentIndex === 0 ? 'none' : 'block';

    if (currentIndex === 1) {
      let toggleSwitch = document.getElementById('togglePlan');
        toggleSwitch.addEventListener("change", setUpPlanToggle);
        let plans = document.getElementById('plans');
        plans.addEventListener("click", selectPlan);
    
  }

  if(currentIndex === 2) {
    if(formDetails.plan) {
      let planElements = document.querySelectorAll(".plan");
      planElements.forEach((plan) => {
          let planType = plan.querySelector(".billing").textContent.trim();
          
          if (planType === formDetails.plan.type) {
              plan.style.border = "3px solid hsl(243, 100%, 62%)";
              plan.dataset.selected = "true";
          } else {
              plan.style.border = "1px solid gray";
              plan.dataset.selected = "false";
          }
      });
  }
  }

  if(currentIndex === 2) {

   updateAddonPrices();
    
        document.querySelectorAll(".add-on").forEach((addOn) => {
          let addOnName = addOn.querySelector(".addon-name").textContent.trim();
          let checkbox = addOn.querySelector("input[type='checkbox']");
      
          if (formDetails.addOns.some((selected) => selected.name === addOnName)) {
            addOn.style.border = "3px solid hsl(243, 100%, 62%)";
            addOn.dataset.selected = "true";
            checkbox.checked = true;
          } else {
            addOn.style.border = "1px solid gray";
            addOn.dataset.selected = "false";
            checkbox.checked = false;
          }
        });
  }


  if (currentIndex === 3) {
    updateSummaryPage();

    let nextButton = document.getElementById('next-btn');
    nextButton.textContent = 'Confirm';
    nextButton.style.backgroundColor = "hsl(243, 100%, 62%)";
    nextButton.style.border = "none";
    
    let changePlan = document.getElementById('changePlan');
    changePlan.addEventListener('click', () => {
      currentIndex = 1;
      nextButton.textContent = 'Next Step';
      nextButton.style.backgroundColor = "hsl(213, 96%, 18%)";
      showUI();
    });
    changePlan.addEventListener('mouseover', () => {
      changePlan.style.color = "hsl(243, 100%, 62%)";
      changePlan.style.opacity = 1;
    })
   }
  }
  
  else {
    steps[currentIndex]();
  }

  }


function renderInfoPage() {

    return `<div class = "mt-6 flex flex-col gap-y-5" id = "content">
    <div class = "name flex flex-col gap-1">
          <label for = "name" class = "font-medium">Name <span class = "font-semibold relative left-60 text-red-600 invisible">This field is required</span></label>
         <input id="name" type="text" value="${formDetails.name}" placeholder="e.g. Vanessa Mint" class="border border-gray-400 h-11 rounded font-semibold"/>
          </div>
            <div class = "email flex flex-col gap-1">
              <label for = "email" class = "font-medium">Email Address <span class = "font-semibold relative left-45 text-red-600 invisible">This field is required</span></label> 
              <input id = "email" type = "email" value="${formDetails.email}" placeholder="e.g. you@example.com" class = "border border-gray-400 h-11 rounded font-semibold"/>
            </div>
               <div class = "number flex flex-col gap-1">
                  <label for = "number" class = "font-medium">Phone Number <span class = "font-semibold relative left-44 text-red-600 invisible">This field is required</span></label> 
                  <input id = "number" type = "tel" value="${formDetails.number}" placeholder="e.g. +91 1234 567 890" class = "border border-gray-400 h-11 rounded font-semibold" />
             </div>
             </div>`

}
function renderPlanPage() {
    return `<div id = "planPage>
    <div id = "plans" class = "flex justify-between gap-x-5 mt-8">
 
    <div class = " border p-4 w-35 rounded-xl cursor-pointer plan" id = "Arcade">
              <div>
              <img src = "./assets/images/icon-arcade.svg" />
              <p class = "mt-13 font-bold text-black billing">Arcade</P>
              <p class = "price opacity-50 text-sm font-medium" data-monthly="$9/mo" data-yearly="$90/yr" price-monthly = "9" price-yearly = "90">$9/mon</p>
              <p class="free mt-1 hidden text-xs font-semibold">2 months free</p>
               </div>
              </div>

               <div class = " border p-4 w-35 rounded-xl cursor-pointer plan" id = "Advanced">
               <div>
            <img src = "./assets/images/icon-advanced.svg" />
              <p class = "mt-13 font-bold text-black billing" >Advanced</P>
              <p class = " price opacity-50 text-sm font-medium" data-monthly="$12/mo" data-yearly="$120/yr" price-monthly = "12" price-yearly = "120" >$12/mon</p>
              <p class="free mt-1 hidden text-xs font-semibold">2 months free</p>
               </div>
               </div>

               <div class = " border p-4 w-35 rounded-xl cursor-pointer plan" id = "Pro">
               <div>
             <img src = "./assets/images/icon-pro.svg" />
              <p class = "mt-13 font-bold text-black billing">Pro</P>
              <p class = "price opacity-50 text-sm font-medium" data-monthly="$15/mo" data-yearly="$150/yr" price-monthly = "15" price-yearly = "150">$15/mon</p>
              <p class="free mt-1 hidden text-xs font-semibold">2 months free</p>
               </div>
               </div>

               </div>

            <div id = "planSelection" class = "flex justify-center items-center mt-10 gap-x-4" >
             <p class = "font-bold mr-2 text-sm">Monthly</p>

           <label class="inline-flex items-center cursor-pointer">
           <input type="checkbox" id = "togglePlan" class="sr-only peer">
           <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
           <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
           </label>

             <p class = "font-bold text-sm">Yearly</p>
             </div>
               </div>
              
               `;

}
function renderAddOnsPage() {
  return `<div id = "add-onsPage" class = "mt-6 flex flex-col gap-y-4"> 
           <div>
           <div class = " border border-gray-400 rounded-xl flex justify-around items-center p-4 gap-x-4 add-on cursor-pointer">
           <input type = "checkbox" class = "h-5 w-5"/>

           <div>
           <p class = "font-bold addon-name">Online service</p>
           <p class = "opacity-50 font-medium">Access to multiplayer games</p>
           </div>

           <span class = "ml-22 add-on-charge" charge-monthly = "1" charge-yearly = "10">+$1/mon</span>

           </div>
           </div>

           <div class = " border  border-gray-400 rounded-xl flex items-center p-4 add-on cursor-pointer">
           <input type = "checkbox" class = "h-5 w-5 "/>

           <div class = "ml-4">
           <p class = "font-bold addon-name">Larger storage</p>
           <p class = "opacity-50 font-medium">Extra 1TB of colud save</p>
           </div>

           <span class = "ml-36 add-on-charge" charge-monthly = "2" charge-yearly = "20">+$2/mon</span>

           </div>

           <div class = "  border  border-gray-400 rounded-xl flex items-center p-4 add-on cursor-pointer">
           <input type = "checkbox" class = "h-5 w-5 "/>

           <div class = "ml-4">
           <p class = "font-bold addon-name">Customizable profile</p>
           <p class = "opacity-50 font-medium">Custom theme on your profile</p>
           </div>

           <span class = "ml-24 add-on-charge " charge-monthly = "2" charge-yearly = "20">+$2/mon</span>

           </div>

          </div>
  `

}

function renderSummaryPage() {
      return `<div class = " mt-10 summaryPage">

               <div class = "border-b border-gray-400 flex gap-x-55 py-3 items-center">

               <div class = "" id = "mainHeader">
               <p class = "font-bold"  id = "summaryPlan">Arcade(Monthly)</p>
               <p class = "opacity-50 text-sm underline font-medium cursor-pointer" id = "changePlan">Change</p>

               </div>
               <p class = "font-extrabold ml-11" id = "summaryCharge">$9/mon</p>

               </div>


      </div>


      `;

} 

function renderThankYouPage() {
  let contentDiv = document.getElementById('content');

  contentDiv.innerHTML = "";

  let newDiv = document.createElement('div');

  let image = document.createElement('img');
  image.src = "./assets/images/icon-thank-you.svg";
  image.classList.add('mb-4')

  let h2 = document.createElement('h2');
  h2.textContent = "Thank you!";
  h2.classList.add('font-bold', 'text-3xl');


  let paragraph = document.createElement('p');
  paragraph.innerHTML = `Thanks for confirming your subscription!<br>
  We hope you have fun using our platform.<br>
  If you ever need support, email us at <strong>support@loremgaming.com</strong>.`;
  paragraph.classList.add("opacity-35", "font-semibold", "text-center", "leading-relaxed");
  

  newDiv.appendChild(image);
  newDiv.appendChild(h2);
  newDiv.appendChild(paragraph);

  contentDiv.appendChild(newDiv);
  newDiv.classList.add("flex", "flex-col", "justify-center", "items-center", "gap-y-2");

  contentDiv.classList.add("flex", "justify-center", "items-center");

}

function updateAddonPrices() {
  let isYearly = formDetails.plan.billing === "yearly";
  let priceAttribute = isYearly ? "charge-yearly" : "charge-monthly";
  let priceSuffix = isYearly ? "yr" : "mo";

  document.querySelectorAll('.add-on-charge').forEach((charge) => {
      charge.textContent = `+$${charge.getAttribute(priceAttribute)}/${priceSuffix}`;
  });

  if (formDetails.addOns.length > 0) {
      document.querySelectorAll(".add-on").forEach((addonElement) => {
          let addonName = addonElement.querySelector(".addon-name").textContent.trim();
          let matchingAddOn = formDetails.addOns.find(addOn => addOn.name === addonName);
          
          if (matchingAddOn) {
              matchingAddOn.price = addonElement.querySelector(`.add-on-charge`).getAttribute(priceAttribute);
          }
      });
  }
}


function updateSummaryPage() {

  let summaryPage = document.querySelector('.summaryPage');
    let mainHeader = document.getElementById("summaryPlan");
    let summaryCharge = document.getElementById("summaryCharge");

    let billingType = formDetails.plan ? formDetails.plan.billing : "monthly";
    
    // Default plan and price
    let planName = formDetails.plan ? formDetails.plan.type : "Arcade";
    let totalBill = formDetails.plan ? parseInt(formDetails.plan.price) : 9;
    let planBillingText = billingType === "yearly" ? "Yearly" : "Monthly";

    // Update the main plan header and charge
    mainHeader.textContent = `${planName} (${planBillingText})`;
    summaryCharge.textContent = `$${totalBill}/${billingType === "yearly" ? "yr" : "mo"}`;

    let addonContainer = document.createElement('div');
    let summaryTotal = document.createElement('div');


  addonContainer.innerHTML = "";
  summaryTotal.innerHTML = "";

  if (formDetails.addOns.length > 0) {
      formDetails.addOns.forEach((addon) => {
          let addonDiv = document.createElement('div');
          let addonName = document.createElement('p');
          let price = document.createElement('p');

          addonName.textContent = addon.name;
          addonName.classList.add("opacity-50", "font-semibold");
          price.textContent = `+$${addon.price}/${billingType === "yearly" ? "yr" : "mo"}`;
          price.classList.add("font-medium")
    
          totalBill += parseInt(addon.price);

          addonDiv.appendChild(addonName);
          addonDiv.appendChild(price);
          addonDiv.classList.add("flex", "justify-between", "text-sm");
          addonDiv.style.padding = "6px 0";


          addonContainer.appendChild(addonDiv);
          addonContainer.style.marginTop = "6px"
      });

  }

  let totalBillDiv = document.createElement('div');
  let totalBillType = document.createElement('p');
  let totalPrice = document.createElement('p');

  totalBillType.textContent = billingType === "monthly" ? `Total (per month)` : `Total (per year)`;
  totalBillType.classList.add("opacity-50", "font-semibold", "text-sm");

  totalPrice.textContent = `$${totalBill}/${billingType === "yearly" ? "yr" : "mo"}`;
  totalPrice.style.fontWeight = "800";
  totalPrice.style.color = "hsl(243, 100%, 62%)"
  totalPrice.style.fontSize = "1.4rem"


  totalBillDiv.appendChild(totalBillType);
  totalBillDiv.appendChild(totalPrice);
  totalBillDiv.classList.add("flex", "justify-between");
  totalBillDiv.style.padding = "8px 0";

  summaryTotal.appendChild(totalBillDiv);
  summaryTotal.style.marginTop = "1.2rem";

  summaryPage.appendChild(addonContainer);
  summaryPage.appendChild(summaryTotal);

  console.log("I'm in updateSummary");
}



function validateInput() {
    
    let isValid = true;  // Track validation state

    if (currentIndex === 0) {
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let number = document.getElementById("number");

        let nameError = document.querySelector('label[for="name"] span');
        let emailError = document.querySelector('label[for="email"] span');
        let numberError = document.querySelector('label[for="number"] span');

        // Name Validation
        if (!name.value.trim()) {
            nameError.classList.remove("invisible");
            isValid = false;
        } else {
            nameError.classList.add("invisible");
            formDetails.name = name.value.trim();
        }

        // Email Validation
        if (!email.value.trim()) {
            emailError.classList.remove("invisible");
            isValid = false;
        } else {
            emailError.classList.add("invisible");
            formDetails.email = email.value.trim();
        }

        // Number Validation
        if (!number.value.trim()) {
            numberError.classList.remove("invisible");
            isValid = false;
        } else {
            numberError.classList.add("invisible");
            formDetails.number = number.value.trim();
        }
    }

    // If validation fails, stop proceeding
    if (!isValid) return;

    // Proceed to the next step if validation passes
    currentIndex++;

    showUI();
}


nextButton.addEventListener('click', validateInput);
backButton.addEventListener('click', () => {
         if(currentIndex === 3) {
          nextButton.textContent = "Next Step";
          nextButton.style.backgroundColor = "hsl(213, 96%, 18%)";
         }
         currentIndex -= 1;
         showUI();
})

// Selecting Plan
document.addEventListener("click", function (event) {
  let selectedPlan = event.target.closest(".plan");
  if (!selectedPlan) return;

  document.querySelectorAll(".plan").forEach((p) => {
      p.style.border = "1px solid gray";
      p.dataset.selected = "false";  
  });

  selectedPlan.style.border = "3px solid hsl(243, 100%, 62%)";
  selectedPlan.dataset.selected = "true";  

  let planType = selectedPlan.querySelector(".billing").textContent;
  let isYearly = document.getElementById("togglePlan").checked;
  let billingType = isYearly ? "yearly" : "monthly";
  let price = isYearly
      ? selectedPlan.querySelector(".price").getAttribute("price-yearly")
      : selectedPlan.querySelector(".price").getAttribute("price-monthly");

  formDetails.plan = { type: planType, billing: billingType, price: price };
  console.log(formDetails.plan);
});



// Selecting Add-ons
document.addEventListener("click", function (event) {
  let selectedAddOn = event.target.closest(".add-on");
  if (!selectedAddOn) return;

  let checkbox = selectedAddOn.querySelector("input[type='checkbox']");
  if (event.target !== checkbox) {
    checkbox.click();  
}


  let addOnName = selectedAddOn.querySelector(".addon-name").textContent;
  let isYearly = formDetails.plan ? formDetails.plan.billing === "yearly" : false;

  let addOnPrice = isYearly    
                      ? selectedAddOn.querySelector(".add-on-charge").getAttribute("charge-yearly") 
                      : selectedAddOn.querySelector(".add-on-charge").getAttribute("charge-monthly");

  if (checkbox.checked) {
      selectedAddOn.style.border = "3px solid hsl(243, 100%, 62%)";
      selectedAddOn.dataset.selected = "true";  
      if (!formDetails.addOns.some(addOn => addOn.name === addOnName)) {
        formDetails.addOns.push({ name: addOnName, price: addOnPrice });
    }
  } else {
      selectedAddOn.style.border = "1px solid gray";
      selectedAddOn.dataset.selected = "false";  
      formDetails.addOns = formDetails.addOns.filter(addOn => addOn.name !== addOnName);
  }
  console.log(formDetails.addOns);
});

// Mouseover 
document.addEventListener("mouseover", function (event) {
  let hoveredElement = event.target.closest(".plan, .add-on");
  if (!hoveredElement) return;

  if (hoveredElement.dataset.selected !== "true") {
      hoveredElement.style.border = "1px solid hsl(243, 100%, 62%)";
  }
});

// Mouseleave
document.addEventListener("mouseleave", function (event) {
  let leftElement = event.target.closest(".plan, .add-on");
  if (!leftElement) return;

  if (leftElement.dataset.selected !== "true") {
      leftElement.style.border = "1px solid gray";
  }
});




//togglePlan
function setUpPlanToggle() {
  let toggleSwitch = document.getElementById("togglePlan");
  let isYearly = toggleSwitch.checked;

  document.querySelectorAll(".price").forEach((price) => {
      price.textContent = isYearly ? price.getAttribute("data-yearly") : price.getAttribute("data-monthly");
  });

  document.querySelectorAll(".free").forEach((freeText) => {
      freeText.classList.toggle("hidden", !isYearly);
  });

  document.querySelectorAll(".plan").forEach((plan) => {
    plan.style.border = "1px solid gray";
    plan.dataset.selected = "false";

    if (formDetails.plan && formDetails.plan.type) {
      formDetails.plan.billing = isYearly ? "yearly" : "monthly";

      let selectedPlan = document.querySelector(`.plan[data-selected="true"]`);
      if (selectedPlan) {
          formDetails.plan.price = isYearly 
              ? selectedPlan.querySelector(".price").getAttribute("price-yearly") 
              : selectedPlan.querySelector(".price").getAttribute("price-monthly");
      }
  }

  console.log("Updated formDetails:", formDetails); 
});

}

showUI();

