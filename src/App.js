import React, { useState, useEffect, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { light } from "src/themes/light";
import "./App.css";
import "antd/dist/antd.css";
import {
	BrowserRouter as Router,
	// Switch,
	Route
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "src/helpers/hooks";
import { CacheSwitch } from "react-router-cache-route";

import Header from "src/components/Header/index";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import Messages from "./components/Messages";

const Home = React.lazy(() => import("src/pages/Home/index.js"));
const Store = React.lazy(() => import("src/pages/Store/index.js"));
const NFTDetail = React.lazy(() => import("src/pages/NFTDetail/index.js"));
const Profile = React.lazy(() => import("src/pages/Profile/index"));
const MintNFTDetail = React.lazy(() => import("src/pages/Profile/Game/NFTDetail/NFTDetail"));


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
					<Header />
					<Suspense fallback={<LoadingPage />}>
						<CacheSwitch>
							<Route exact path="/" component={props => <Home {...props} />} />
							<Route exact path="/store" component={props => <Store {...props} />} />
							<Route path="/store/:id" component={props => <NFTDetail {...props} />} />
							<Route exact path="/profile" component={props => <Profile {...props} />} />
							<Route exact path="/profile/:tab" component={props => <Profile {...props} />} />
							<Route exact path="/profile/game/:address/:nftId" component={props => <MintNFTDetail {...props} />} />
						</CacheSwitch>
					</Suspense>
				</Router>
			</ThemeProvider>
		</Provider >
	);
}

export default App;
