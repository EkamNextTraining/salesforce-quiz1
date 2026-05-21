// =========================================================
//  SALESFORCE QUIZ — QUESTIONS BANK
//  Edit, add, or remove questions here freely.
//  Each question needs: category, question, options (4), answer (0-indexed)
// =========================================================

const QUESTIONS = [
  {
    category: "CRM Basics",
    question: "Which of the following best describes a Salesforce 'Opportunity'?",
    options: [
      "A record that tracks a potential sale or deal",
      "A record that tracks a customer complaint",
      "A record that stores contact information",
      "A record for tracking product inventory"
    ],
    answer: 0
  },
  {
    category: "Data Model",
    question: "What is the maximum number of custom objects allowed in Salesforce Enterprise Edition?",
    options: ["100", "200", "400", "800"],
    answer: 2
  },
  {
    category: "Automation",
    question: "Which automation tool in Salesforce allows you to automate complex business processes with a visual, point-and-click interface?",
    options: ["Workflow Rules", "Process Builder", "Flow Builder", "Apex Triggers"],
    answer: 2
  },
  {
    category: "Security",
    question: "In Salesforce, which feature controls what records a user can see based on ownership hierarchy?",
    options: [
      "Permission Sets",
      "Role Hierarchy",
      "Profile Settings",
      "Field-Level Security"
    ],
    answer: 1
  },
  {
    category: "Reports & Dashboards",
    question: "Which report type in Salesforce allows you to group rows of data by a field value?",
    options: ["Tabular Report", "Summary Report", "Matrix Report", "Joined Report"],
    answer: 1
  },
  {
    category: "Sales Cloud",
    question: "What does the 'Lead Conversion' process do in Salesforce?",
    options: [
      "Converts a Lead into an Account, Contact, and optionally an Opportunity",
      "Converts a Contact into a Lead",
      "Merges duplicate Lead records",
      "Archives old Lead records"
    ],
    answer: 0
  },
  {
    category: "Apex & Development",
    question: "Which governor limit applies to the total number of SOQL queries issued in a single Apex transaction?",
    options: ["50", "100", "150", "200"],
    answer: 2
  },
  {
    category: "Service Cloud",
    question: "In Salesforce Service Cloud, what feature automatically routes cases to the right agent or queue based on predefined criteria?",
    options: [
      "Escalation Rules",
      "Assignment Rules",
      "Omni-Channel",
      "Entitlement Management"
    ],
    answer: 2
  },
  {
    category: "Data Model",
    question: "A lookup relationship in Salesforce is different from a master-detail relationship because:",
    options: [
      "Lookup records are deleted when the parent is deleted",
      "Lookup relationships do not support roll-up summary fields",
      "Lookup relationships require a parent record",
      "Master-detail supports sharing rules independently"
    ],
    answer: 1
  },
  {
    category: "Automation",
    question: "Which of the following is TRUE about Salesforce Workflow Rules?",
    options: [
      "They can perform DML operations on related records",
      "They support 'Before Save' and 'After Save' events",
      "They can only trigger on record creation or update",
      "They have been deprecated and replaced by Flow"
    ],
    answer: 2
  },
  {
    category: "Security",
    question: "What is the purpose of a Permission Set in Salesforce?",
    options: [
      "To restrict access to all records in an object",
      "To extend a user's access beyond their Profile without changing the Profile",
      "To define sharing rules for groups of users",
      "To set the organisation's password policy"
    ],
    answer: 1
  },
  {
    category: "CRM Basics",
    question: "Which standard Salesforce object is used to log a phone call or email interaction with a contact?",
    options: ["Task", "Event", "Activity", "Case"],
    answer: 2
  },
  {
    category: "Reports & Dashboards",
    question: "Which dashboard component would BEST visualize a single key metric, like total revenue this quarter?",
    options: ["Bar Chart", "Pie Chart", "Gauge", "Metric"],
    answer: 3
  },
  {
    category: "Apex & Development",
    question: "What does the @isTest annotation do in Salesforce Apex?",
    options: [
      "Marks a class to run in sandbox only",
      "Marks a class or method as a test and excludes it from production code coverage counting",
      "Deploys the class to production automatically",
      "Enables debug logs for the class"
    ],
    answer: 1
  },
  {
    category: "Sales Cloud",
    question: "In Salesforce, 'Forecasting' is primarily used to:",
    options: [
      "Predict the weather impact on outdoor sales events",
      "Estimate expected revenue from open Opportunities",
      "Track campaign ROI",
      "Generate invoices automatically"
    ],
    answer: 1
  }
];
