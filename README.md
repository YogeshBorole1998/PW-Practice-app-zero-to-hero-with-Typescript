# 🎭 PW-Practice-App-Playwright-Automation 

This repository contains an **Angular application akveo.com** integrated with **Playwright** for end-to-end (E2E) testing.

---

## 📂 Project Structure

```plaintext
PW-PRACTICE-APP-MASTER/
│── .angular/                  # Angular configuration  
│── playwright-tests/          # Playwright test cases  
│   ├── page-objects/          # Page Object Model (POM) files  
│   ├── PW-API-Automation/     # API automation tests  
│   ├── *.spec.ts              # Test case files  
│── playwright-report/         # Test execution reports  
│── src/                       # Angular application source code  
│── test-results/              # Playwright test results  
│── package.json               # Dependencies and scripts  
│── playwright.config.ts       # Playwright configuration  
│── README.md                  # Documentation  
```
## 🚀 Getting Started 
1️⃣ Clone the Repository
```
git clone https://github.com/your-username/pw-practice-app-master.git  
cd pw-practice-app-master  
```
2️⃣ Install Dependencies
```
npm install --force  
```
3️⃣ Run the Angular Application
```
ng serve  
Open: http://localhost:4200/
```

4️⃣ Run Playwright Tests
```
npx playwright test  
```
Run a Specific Test
```
npx playwright test playwright-tests/example.spec.ts
```
Run Tests in UI Mode
```
npx playwright test --ui
```
Generate Playwright Report
```
npx playwright show-report
```

## 📌 Features
✅ Playwright Tests for Web Automation<br>
✅ Page Object Model (POM) for better test structure<br>
✅ API Automation<br>
✅ UI Component Testing (forms, checkboxes, dialogs, iFrames, etc.)<br>
✅ Playwright Report Generation<br>
✅ Best Practices & Locators Strategy<br>

## 🛠 Configuration
Modify playwright.config.ts for browser settings, timeouts, retries, and parallel execution.

## 📝 Test Organization
🔸Locators: Uses best Playwright locator strategies.<br>
🔸Assertions: Different assertion techniques implemented.<br>
🔸Test Hooks: beforeEach and afterEach used for test setup/cleanup.<br>
🔸Retries & Timeouts: Configured in Playwright settings.<br>

## 📷 Screenshots & Test Results
Stored under /test-results/ and /screenshots/.

## 🐞 Debugging
Run tests in debug mode:
```
npx playwright test --debug  
```
Use UI mode for interactive debugging:
```
npx playwright test --ui  
```

## 📢 Contributing
Feel free to fork the repo, submit issues, and contribute!

## 🎯 Happy Testing with Playwright! 🚀
