export const apiURL = () => {
    return window.location.hostname === "localhost" ?
    "http://localhost:3001" : "https://facespace-app-068f126e5704.herokuapp.com/"
} 