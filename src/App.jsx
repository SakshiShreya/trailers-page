import { Provider } from "react-redux";
import HeaderCont from "./components/HeaderCont/HeaderCont";
import MoviesCont from "./components/MoviesCont/MoviesCont";
import store from "./redux/store";
import "./styles.css";

export default function App() {
  return (
    <Provider store={store}>
      <HeaderCont />
      <MoviesCont />
    </Provider>
  );
}
