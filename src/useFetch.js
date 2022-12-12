import { useState, useEffect } from "react";

const useFetch = (url) => {
  // custom hooks are reusable functions so that we dont have to write the same code over and over again.
  // basically we extract the components logic into its own resuable fn.
  // here we are passing the url as a parameter into the fn. rather than a hardcoded value in fetch beause our urls can change if we are using this custom hook at different places

  // we are using state in this hook
  // we need to register the state here, bc the state was in other file. so if we are making a custom hook andd we are using state therefore  we need to set the state here in our custom hook.
  // we are updating all these state properties

  const [data, setData] = useState(null); // initally data will be null
  const [isLoading, setIsLoading] = useState(true); // while there is no data we will display loading which is set to true.
  const [err, setError] = useState(null); // since we do not have any data yet and loading msg is displayed untill we get any network errors or fetch error hence we set the initial value of error to null.

  useEffect(() => {
    const abortControl = new AbortController(); // we create an instance of AbortController function to abort the fetch request. this abortControl object has a signal property on it, which is passed as an option in fetch.

    setTimeout(() => {
      fetch(url, { signal: abortControl.signal }) // option in fetch with signal property.
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            // response object has few props on it and one of them is res.ok which is to check the HTTP status from the server
            throw Error("Could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data); // if the data gets fetched and after converting to json we update the state by setData function and updating the state value of data to be the data that's fetched.
          setIsLoading(false); // same is with isLoading we update the state value to false.
          setError(null); // and error to false as well in case there is no data that could be fetched.
        })
        .catch((err) => {
          // auto catches network / connection error
          // if we catch any error we store it in a state variable error, as null initially.
          // then once we get an error (network / connection error) we update the state and show the error in the browser.

          // we are also catching any abort errors if any
          // error obj has a name property on it.
          if (err.name === "AbortError") {
            // we do not update the state
            console.log("fetch aborted");
          } else {
            // we update the state and display the error in the browser
            setIsLoading(false);
            setError(err.message);
          }
        });
    }, 1000); // using setTimeOut in a real project is not a good idea, cause we do not want the user to wait and extra second. after the data is fetched. it is just to mimick how the server request can delay sometimes.
    // using a cleanup function
    // we use cleanup because sometimes when the component gets unmounted and we are trying to update the state. this cannot be done we cannot update the state on an unmounted component so we return a value in useEffect hook which is a fn. and in that fn we do the cleanup ex. aborting fetch req.
    return () => {
      // clean up
      abortControl.abort();
    };
  }, [url]);

  // at the end in our custom hook we return some values,
  // because hooks returns us some value.
  // we could return an array or an object,
  // but there is no order in destructuring objects therefore i'll use objects as return value
  // if we use array destructuring we have to keep the order of destructuring the same as they're returned
  return { data, isLoading, err };
};

export default useFetch;
