import { Provider } from "react-redux";
import MoviesCont from "./components/MoviesCont/MoviesCont";
import store from "./redux/store";
import "./styles.css";

export default function App() {
  return (
    <Provider store={store}>
      <MoviesCont />
    </Provider>
  );
}
