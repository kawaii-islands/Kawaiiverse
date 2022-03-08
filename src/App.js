import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { light } from "src/themes/light";
import Header from "./components/Header";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "src/helpers/hooks";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Messages from "./components/Messages";
import NFTDetail from "./pages/NFTDetail";
import 'antd/dist/antd.css';

function App() {
	const context = useWeb3React();
	const { connector } = context;
	const [activatingConnector, setActivatingConnector] = useState();
	const triedEager = useEagerConnect();
	useInactiveListener(!triedEager || !!activatingConnector);
	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	return (
		<Provider store={store}>
			<ThemeProvider theme={light}>
				<CssBaseline />
				<Messages />
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="store" >
							<Route index element={<Store />} />
							<Route path=":id" element={<NFTDetail />} />
						</Route>
					</Routes>
				</Router>
			</ThemeProvider>
		</Provider >
	);
}

export default App;
