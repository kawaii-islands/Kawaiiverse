import React, { useState, useEffect, Suspense } from "react";
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
import Messages from "./components/Messages";
import 'antd/dist/antd.css';
import LoadingPage from "./components/LoadingPage/LoadingPage";
import Profile from "./pages/Profile";
const Home = React.lazy(() => import("src/pages/Home/index.js"));
const Store = React.lazy(() => import("src/pages/Store/index.js"));
const NFTDetail = React.lazy(() => import("src/pages/NFTDetail/index.js"));

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
			<Suspense fallback={<h1>Loading</h1>}>
				<CssBaseline />
				<Messages />
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="store" >
							<Route index element={<Store />} />
							<Route path=":id" element={<NFTDetail />} />
						</Route>
						<Route path="profile" element={<Profile />} />
					</Routes>
				</Router>
				</Suspense>
			</ThemeProvider>
			
		</Provider >
	);
}

export default App;
