const labels = (label) => {
    switch(label) {
        case 'Access denied':
        case 'One or more parameter values were invalid: An AttributeValue may not contain an empty string':
        case 'Invalid password':
        case 'Username not found':
            return 'The credentials you provided are invalid. Please try again, or click the "Forgot your username or password" link to reset them.';
        default:
            return 'An unexpected error has occurred. Please try again, and if the problem persists please contact support at 202.363.2511';
    }
};

export default labels;
