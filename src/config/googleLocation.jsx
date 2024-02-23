import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import InputTextField from "../ui/elements/InputTextField";
const api_key = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const LocationInputField = ({ setValue, value, getVal, ...restProps }) => {
  const libraries = useMemo(() => ['places'], []);
  const [isLoaded, setIsLoaded] = useState(false);

  const { isLoaded: scriptLoaded, loadError, } = useJsApiLoader({
    googleMapsApiKey: api_key,
    libraries: libraries,
  });

  useEffect(() => {
    if (scriptLoaded) {
      setIsLoaded(true);
    }
  }, [scriptLoaded]);
  const handleAutoComplete = (id) => {
    if (isLoaded) {
      // console.log(isLoaded)
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById(id),
        {
          componentRestrictions: { country: "IN" },
          types: ["(cities)"],

        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log(place)
        setValue(place[getVal ? getVal : 'formatted_address'])
      });
    }
  };
  useEffect(() => {
    handleAutoComplete("location");
  }, [isLoaded]);

  // return { isLoaded, loadError };
  return (<>
    <InputTextField
      {...restProps}
      className='!caret-black'
      label='Location'
      id='location'
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </>)
};

export default LocationInputField;