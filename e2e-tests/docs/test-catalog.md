# Authentication End-to-End Test Catalog

## Registration Test Cases

### R1: Successful User Registration
**Priority:** High
**Description:** Verify that a user can successfully register with valid credentials
**Steps:**
1. Navigate to /register
2. Enter valid email address
3. Enter valid password (8-24 characters)
4. Enter matching password in retype field
5. Click "Register" button
**Expected Results:**
- Success message displayed
- User redirected to login page
- No error messages shown

### R2: Email Validation
**Priority:** High
**Description:** Verify email validation functionality
**Test Cases:**
1. Invalid email formats:
   - Missing @ symbol (test.example.com)
   - Missing domain (test@.com)
   - Special characters (test!@example.com)
   - Empty email field
2. Already registered email
**Expected Results:**
- Error message "Invalid email address" shown
- Form not submitted
- User remains on registration page

### R3: Password Validation
**Priority:** High
**Description:** Verify password requirements and matching
**Test Cases:**
1. Password length:
   - Too short (< 8 characters)
   - Too long (> 24 characters)
2. Password mismatch:
   - Different passwords in both fields
**Expected Results:**
- Appropriate error messages shown
- Form not submitted
- User remains on registration page

## Login Test Cases

### L1: Successful Login
**Priority:** High
**Description:** Verify that registered users can login
**Steps:**
1. Navigate to /login
2. Enter registered email
3. Enter correct password
4. Click "Login" button
**Expected Results:**
- User redirected to homepage
- JWT token stored in cookies
- Success message shown

### L2: Remember Me Functionality
**Priority:** Medium
**Description:** Verify "Remember Me" checkbox functionality
**Steps:**
1. Login with "Remember Me" checked
2. Close browser
3. Reopen browser and navigate to site
**Expected Results:**
- User session persists
- JWT cookie has 7-day expiration

### L3: Invalid Login Attempts
**Priority:** High
**Description:** Verify system handling of invalid login attempts
**Test Cases:**
1. Wrong password
2. Unregistered email
3. Empty fields
**Expected Results:**
- Appropriate error messages shown
- User remains on login page
- No JWT token created

### L4: Navigation and Links
**Priority:** Low
**Description:** Verify all authentication-related navigation
**Test Cases:**
1. "Don't have an Account?" link
2. "Forgot Password" link
3. "Back to Login" link on register page
**Expected Results:**
- Links navigate to correct pages
- Navigation maintains form state when appropriate

## Security Test Cases

### S1: Input Validation
**Priority:** High
**Description:** Verify input field security
**Test Cases:**
1. XSS attempts in email/password fields
2. SQL injection attempts
3. Special characters in inputs
**Expected Results:**
- Inputs properly sanitized
- No script execution
- No database errors

### S2: Session Management
**Priority:** High
**Description:** Verify proper session handling
**Test Cases:**
1. JWT token validation
2. Session timeout
3. Multiple login attempts
**Expected Results:**
- Invalid tokens rejected
- Sessions expire correctly
- Rate limiting applied

## Test Environment Requirements

### Technical Setup
- Browser: Latest versions of Chrome, Firefox, Safari
- Base URL: http://localhost:5173
- Test Data: Clean database state before tests
- API endpoint: Configured in environment variables

### Test Data Requirements
- Test user credentials
- Invalid email formats
- Password variations
- Sample JWT tokens

## Test Execution Notes
1. Run tests in isolated environment
2. Clear cookies and local storage between tests
3. Verify both frontend and backend validation
4. Document any deviations from expected behavior