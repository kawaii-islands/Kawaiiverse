import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "src/components/MainLayout";
import { error } from "src/slices/MessagesSlice";

const Home = () => {

	return (
		<MainLayout>
			Home page
		</MainLayout>
	);
};

export default Home;
