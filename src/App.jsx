import { Provider } from "react-redux";
import FilterSection from "./components/generic/FilterSection/FilterSection";
import HeaderCont from "./components/HeaderCont/HeaderCont";
import MoviesCont from "./components/MoviesCont/MoviesCont";
import { mobileBreakpoint } from "./constants/contants";
import useWindowDimensions from "./hooks/useWindowDimensions";
import store from "./redux/store";
import "./styles.css";
import "./assets/scss/normalize.scss";

export default function App() {
  const { width } = useWindowDimensions();

  return (
    <Provider store={store}>
      <HeaderCont />
      {width < mobileBreakpoint && <div className="filters"><FilterSection /></div>}
      <MoviesCont />
    </Provider>
  );
}
