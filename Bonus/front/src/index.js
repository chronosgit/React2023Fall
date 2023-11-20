import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

import "./index.css";

const onWorkerReady = () => {
	console.log("SW is ready");
}
navigator.serviceWorker.register("sw.js");
navigator.serviceWorker.ready.then(onWorkerReady);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);