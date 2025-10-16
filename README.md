# autFrontBackCypress
Repositório com todo material do curso de Automação Front-end e Back-end utilizando Cypress + Cucumber.

Repositório para BACK-END
Estruturas sugeridas:

cypress/
├── e2e/
│   ├── features/               <-- Nossos arquivos Gherkin
│   │   ├── apiItems.feature
│   |   └── e2eItemFlow.feature
│   └── steps/                  <-- Nossas definições de steps
│       ├── apiItemsSteps.js
│       └── e2eItemFlowSteps.js
├── fixtures/
│   └── requestBody_novo_item.json
└── support/
    ├── commands.js             <-- Onde colocaremos nossos comandos customizados
    └── e2e.js

ou
"Mudar em package.json o stepDefinitions para cypress/support/steps_definitions"

cypress/
├── e2e/
│   ├── features/                       <-- Nossos arquivos Gherkin
│   |   └── e2eItemFlow.feature
├── integration/
│   ├── services/                       <-- Nossos arquivos Gherkin
│   │   ├── itemsServices.feature
├── fixtures/
│   └── requestBody_novo_item.json
└── support/
    ├── steps_definitions/              <-- Nossas definições de steps
    |    ├── generalSteps.js
    |    ├── itemsServicesSteps.js
    |    └── e2eItemFlowSteps.js
    ├── commands.js                     <-- Onde colocaremos nossos comandos customizados
    ├── itemsServices.js
    └── e2e.js

