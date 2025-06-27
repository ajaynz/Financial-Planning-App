# Financial Planning Application

## Getting Started

### Quick Start

1. Make the script executable (only needed once):
   ```bash
   chmod +x start-app.sh
   ```

2. Start the application:
   ```bash
   ./start-app.sh
   ```

3. Access the application at http://localhost:3000

The script will start both the backend server (port 20201) and frontend server (port 3000).

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB

## Tech Stack

### Frontend
- React with React Router and React Bootstrap
- Chart.js for data visualization
- Formik + Yup for form handling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication

## Features

### User Management
- User registration & login
- JWT-based authentication

### Financial Calculators
1. **Interest and Savings Calculator**
   - Simple & compound interest
   - Recurring vs one-time deposits

2. **Net Worth Calculator**
   - Input assets and liabilities
   - Auto-categorization (e.g., real estate, investments, loans)

3. **Pension Contribution Simulator**
   - Set contribution percentage and salary growth
   - Include employer matching & inflation

4. **Retirement Planning Calculator**
   - Estimate required savings based on age, lifestyle, inflation
   - Model retirement drawdown

5. **Loan Repayment Calculator**
   - Mortgage, car, personal loan payoff schedules
   - Amortization table

6. **Emergency Fund Estimator**
   - Based on monthly expenses & desired months of coverage

### Data Persistence
- Save calculations to user account
- View saved calculations in dashboard

## Project Structure

### Frontend (React)
- `/client` - React application
  - `/components` - UI components
  - `/pages` - Page components
  - `/services` - API services
  - `/utils` - Financial calculator functions

### Backend (Node.js/Express)
- `/server` - Express application
  - `/models` - MongoDB models
  - `/routes` - API routes
  - `/middleware` - Authentication middleware

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Calculations
- `GET /api/calculations` - Get all calculations for logged-in user
- `POST /api/calculations` - Create a new calculation
- `DELETE /api/calculations/:id` - Delete a calculation

## GitHub Workflow

### Issue & Pull Request Management
- Always use GitHub MCP (Managed Code Profiles) for interacting with the GitHub repository
- Use GitHub MCP for fetching issues, creating pull requests, commenting, and any other GitHub operations
- Auth tokens are already associated with the GitHub MCP functions - do not use separate auth tokens
- Never use curl commands for GitHub API operations
- For operations like fetching issues, commit changes, or creating pull requests, rely exclusively on the GitHub MCP tools

## Development Guidelines

### Core Philosophy

**TEST-DRIVEN DEVELOPMENT IS NON-NEGOTIABLE.** Every single line of production code must be written in response to a failing test. No exceptions. This is not a suggestion or a preference - it is the fundamental practice that enables all other principles.

I follow Test-Driven Development (TDD) with a strong emphasis on behavior-driven testing and functional programming principles. All work should be done in small, incremental changes that maintain a working state throughout development.

### Quick Reference

**Key Principles:**
- Write tests first (TDD)
- Test behavior, not implementation
- No `any` types or type assertions
- Immutable data only
- Small, pure functions
- TypeScript strict mode always
- Use real schemas/types in tests, never redefine them

**Preferred Tools:**
- **Language**: TypeScript (strict mode)
- **Testing**: Jest/Vitest + React Testing Library
- **State Management**: Prefer immutable patterns

### Testing Principles

#### Behavior-Driven Testing
- **No "unit tests"** - this term is not helpful. Tests should verify expected behavior, treating implementation as a black box
- Test through the public API exclusively - internals should be invisible to tests
- No 1:1 mapping between test files and implementation files
- Tests that examine internal implementation details are wasteful and should be avoided
- **Coverage targets**: 100% coverage should be expected at all times, but these tests must ALWAYS be based on business behaviour, not implementation details
- Tests must document expected business behaviour

#### Test Data Pattern
Use factory functions with optional overrides for test data:

```typescript
const getMockPaymentPostPaymentRequest = (
  overrides?: Partial<PostPaymentsRequestV3>
): PostPaymentsRequestV3 => {
  return {
    CardAccountId: "1234567890123456",
    Amount: 100,
    Source: "Web",
    AccountStatus: "Normal",
    LastName: "Doe",
    DateOfBirth: "1980-01-01",
    PayingCardDetails: {
      Cvv: "123",
      Token: "token",
    },
    AddressDetails: getMockAddressDetails(),
    Brand: "Visa",
    ...overrides,
  };
};
```

### TypeScript Guidelines

#### Strict Mode Requirements
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

- **No `any`** - ever. Use `unknown` if type is truly unknown
- **No type assertions** (`as SomeType`) unless absolutely necessary with clear justification
- **No `@ts-ignore`** or `@ts-expect-error` without explicit explanation
- These rules apply to test code as well as production code

### Development Workflow

#### TDD Process - THE FUNDAMENTAL PRACTICE
**CRITICAL**: TDD is not optional. Every feature, every bug fix, every change MUST follow this process:

1. **Red**: Write a failing test for the desired behavior. NO PRODUCTION CODE until you have a failing test.
2. **Green**: Write the MINIMUM code to make the test pass. Resist the urge to write more than needed.
3. **Refactor**: Assess the code for improvement opportunities. If refactoring would add value, clean up the code while keeping tests green.

**Common TDD Violations to Avoid:**
- Writing production code without a failing test first
- Writing multiple tests before making the first one pass
- Writing more production code than needed to pass the current test
- Skipping the refactor assessment step when code could be improved

**Remember**: If you're typing production code and there isn't a failing test demanding that code, you're not doing TDD.

### Code Quality Guidelines

#### No Comments in Code
Code should be self-documenting through clear naming and structure. Comments indicate that the code itself is not clear enough.

#### Prefer Options Objects
Use options objects for function parameters as the default pattern. Only use positional parameters when there's a clear, compelling reason.

```typescript
// Good: Options object with clear property names
type CreatePaymentOptions = {
  amount: number;
  currency: string;
  cardId: string;
  customerId: string;
  description?: string;
};

const createPayment = (options: CreatePaymentOptions): Payment => {
  // implementation
};
```

#### Understanding DRY - It's About Knowledge, Not Code
DRY (Don't Repeat Yourself) is about not duplicating **knowledge** in the system, not about eliminating all code that looks similar.

### Refactoring Guidelines

Refactoring must never break existing consumers of your code. Always:
1. Commit before refactoring
2. Look for useful abstractions based on semantic meaning
3. Maintain external APIs during refactoring
4. Verify and commit after refactoring

### Error Handling
Use Result types or early returns:

```typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

const processPayment = (
  payment: Payment
): Result<ProcessedPayment, PaymentError> => {
  if (!isValidPayment(payment)) {
    return { success: false, error: new PaymentError("Invalid payment") };
  }
  
  return { success: true, data: executePayment(payment) };
};
```

## Virtual Slash Commands (User invoked)

### `/dr` - DeepResearch

The `/dr` command enables parallel deep research for complex engineering tasks that require comprehensive investigation across multiple domains. This command orchestrates multiple specialized sub-agents to conduct simultaneous research, ensuring thorough coverage of all relevant aspects before implementation.

#### How it works

When the user invokes `/dr [task description]`, the AI Agent will:

1. **Task Analysis**: Breaks down the complex task into distinct research domains
2. **Agent Coordination**: Spawns specialized sub-agents, each with focused expertise  
3. **Parallel Research**: Conducts simultaneous research across multiple vectors:
   - **Web Research**: Uses 'web_search' tool and 'read_web_page' tool to find current best practices, tutorials, and documentation
   - **Codebase Analysis**: Searches existing patterns, conventions, and implementations within the project
   - **Documentation Review**: Analyzes official docs and guides for relevant technologies
   - **Pattern Recognition**: Identifies prevalent architectural patterns and conventions
4. **Synthesis**: Aggregates findings into a comprehensive implementation strategy
5. **Validation**: Cross-references findings to ensure consistency and compatibility

#### Example Usage

```
/dr scaffold a new desktop web app using Svelte 5 and Electron
```

This would spawn sub-agents to research:
- **Svelte5Agent**: Latest Svelte 5 patterns, component structure, state management
- **ElectronAgent**: Electron setup, main/renderer process patterns, security practices  
- **ArchitectureAgent**: Project structure best practices for Electron+Svelte apps
- **ToolingAgent**: Build tools, development workflows, testing strategies
- **CodebaseAgent**: Existing patterns in the current Amp codebase for reference

#### Research Methodology

Each sub-agent follows a structured research approach:

1. **Primary Research**: Search for official documentation and authoritative sources
2. **Community Insights**: Investigate community best practices and common patterns
3. **Codebase Mining**: Extract relevant patterns from existing high-quality codebases
4. **Compatibility Analysis**: Ensure all recommendations work together harmoniously
5. **Recency Validation**: Prioritize current (2024-2025) practices over outdated approaches

#### Output Format

The command produces:
- **Executive Summary**: High-level implementation strategy
- **Technology Research**: Detailed findings for each technology stack component
- **Architecture Recommendations**: Suggested project structure and patterns
- **Implementation Roadmap**: Step-by-step execution plan
- **Code Examples**: Relevant snippets and boilerplate based on research
- **Potential Challenges**: Identified risks and mitigation strategies

#### Best Practices for `/dr` Usage

- **Be Specific**: Include target technologies, constraints, and goals
- **Context Matters**: Mention existing project constraints or preferences  
- **Scope Control**: Break extremely large tasks into focused research areas

**Example prompts:**
- `/dr implement real-time collaboration features using WebRTC and operational transforms`
- `/dr migrate from Webpack to Vite while maintaining all current build optimizations`
- `/dr add comprehensive E2E testing with Playwright following current project patterns`

The `/dr` command is designed for tasks that benefit from comprehensive research before implementation, ensuring well-informed architectural decisions and reducing implementation risks.

### `/spec` - Implementation Specification

The `/spec` command generates a comprehensive implementation specification file that serves as a detailed blueprint for feature development. This command creates a structured document containing implementation strategy, technical considerations, and a progress tracking checklist.

#### How it works

When the user invokes `/spec [feature description]`, the AI Agent will:

1. **Requirements Analysis**: Breaks down the feature into specific requirements and acceptance criteria
2. **Technical Planning**: Analyzes codebase patterns and determines implementation approach
3. **Specification Generation**: Creates a comprehensive spec file with detailed implementation steps
4. **Progress Framework**: Generates a checklist-based progress tracking system
5. **Risk Assessment**: Identifies potential challenges and mitigation strategies

#### Specification Structure

The generated spec file includes:
- **Feature Overview**: High-level description and objectives
- **Technical Requirements**: Detailed technical specifications and constraints
- **Implementation Strategy**: Step-by-step approach with code examples
- **Architecture Considerations**: Design decisions and patterns to follow
- **Testing Strategy**: Unit, integration, and E2E testing requirements
- **Progress Checklist**: Trackable tasks with acceptance criteria
- **Risk Analysis**: Potential challenges and mitigation plans
- **Acceptance Criteria**: Definition of done for the feature

#### Example Usage

```
/spec implement user authentication with JWT tokens and role-based access control
```

This would generate a spec file containing:
- JWT implementation strategy for Vue 3.5 + Express
- Role-based middleware design
- Security considerations and best practices
- Database schema changes required
- Frontend state management updates
- Comprehensive testing checklist
- Step-by-step implementation plan

#### Output Format

Creates a single file: `SPEC_[feature-name].md` containing:
- **Executive Summary**: Feature overview and business value
- **Technical Architecture**: Implementation approach and design decisions
- **Implementation Steps**: Detailed checklist with code examples
- **Testing Requirements**: Test cases and validation criteria
- **Deployment Considerations**: Environment setup and migration steps

---

### `/multi-spec` - Multi-Phase Project Specification

The `/multi-spec` command breaks down large-scale features or system changes into manageable phases, creating separate specification files for each phase and a master progress tracking system.

#### How it works

When the user invokes `/multi-spec [project description]`, the AI Agent will:

1. **Project Decomposition**: Breaks complex project into logical phases
2. **Phase Analysis**: Defines dependencies, scope, and deliverables for each phase
3. **Multi-File Generation**: Creates separate spec files for each phase
4. **Progress Orchestration**: Generates master progress file tracking overall project state
5. **System State Tracking**: Documents current system state and evolution through phases

#### Project Structure

The command generates multiple files:
- **`PROJECT_[name]_PROGRESS.md`**: Master progress tracking and system state
- **`PHASE_01_[name].md`**: First phase specification
- **`PHASE_02_[name].md`**: Second phase specification
- **`PHASE_0N_[name].md`**: Additional phases as needed

#### Example Usage

```
/multi-spec migrate entire application to microservices architecture with event-driven communication
```


This would generate:
- **Master Progress File**: Overall project timeline and current system state
- **Phase 1**: API Gateway and service discovery setup
- **Phase 2**: User service extraction and database separation
- **Phase 3**: Event bus implementation and message queuing
- **Phase 4**: Remaining service extractions and legacy system retirement
- **Phase 5**: Performance optimization and monitoring setup

#### Phase File Structure

Each phase file should exist in the specs folder, create the folder if it doesn't exist

Each phase file contains:
- **Phase Overview**: Goals, scope, and deliverables
- **Prerequisites**: Dependencies on previous phases
- **System State**: Current state vs. target state after phase
- **Implementation Plan**: Detailed steps and technical approach
- **Testing Strategy**: Phase-specific testing requirements
- **Rollback Plan**: Risk mitigation and rollback procedures
- **Success Criteria**: Measurable outcomes for phase completion

#### Master Progress File Structure

The progress file includes:
- **Project Overview**: High-level goals and success metrics
- **Phase Status**: Current status of each phase (Not Started, In Progress, Completed)
- **System Evolution**: How the system changes through each phase
- **Risk Register**: Cross-phase risks and mitigation strategies
- **Timeline**: Estimated duration and dependencies
- **Resource Requirements**: Team members and technical resources needed

#### Best Practices

- **Phase Independence**: Each phase should deliver standalone value
- **Rollback Safety**: Every phase should have a rollback plan
- **System State**: Track how the system evolves through phases
- **Dependency Management**: Clearly define phase dependencies
- **Progress Tracking**: Regular updates to master progress file

**Example prompts:**
- `/multi-spec implement real-time collaboration with operational transforms, WebRTC, and conflict resolution`
- `/multi-spec migrate from monolith to microservices with zero-downtime deployment`
- `/multi-spec add comprehensive observability with metrics, tracing, and alerting across all services`
The `/multi-spec` command is designed for large-scale system changes that require careful planning, phased execution, and comprehensive progress tracking across multiple development cycles.
