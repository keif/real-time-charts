import React from "react";

import { connect } from "react-redux";
import Graph from "./components/graph";
import RealTime from "./components/realtime";
import Map from "./components/map";
import TopNav from "./components/topnav";

const _applyListener = function(type) {
    var histFunc = history[type];
    return function() {
        var rv = histFunc.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};
 

@connect((store) => {
  return {routes: store.routes}
}) 
export default class Layout extends React.Component {
	
	constructor(props) {
		super(props);
		history.pushState = _applyListener('pushState');
		window.onpopstate = (e) => {
			console.log(e);
			let newPath = e.state.Url;
			let comp = this.props.routes.routeComponents[newPath];
			let topNav = <TopNav theClass={newPath === '/realtime' ? "rt-alter" : ""} pathName={newPath} />;
			 this.props.dispatch({
		          type: "NEW_PATH",
		          payload: {pathName: newPath, blocked: comp, topNav: topNav}
		      });
		
		};
	    const eventHandler =  (() => {
	    	const thisScope = this;
	    	return (e) => {
	    		console.log('State Changed!', e);
	    		let newPath = e.arguments[0].Url;
	    		let comp = thisScope.props.routes.routeComponents[newPath];
	    		let topNav = <TopNav theClass={newPath === '/realtime' ? "rt-alter" : ""} pathName={newPath} />;
	    		thisScope.props.dispatch({
		          type: "NEW_PATH",
	    		  payload:{pathName: newPath, blocked: comp , topNav: topNav}
	    		  });
	    	}
	    })();

		window.addEventListener('pushState', eventHandler);
			
		
		} 
	 	newSet (newPath) {
			let comp = thisScope.props.routes.routeComponents[newPath];
			this.props.dispatch({
		     type: "NEW_PATH",
			 payload:{pathName: newPath, blocked: comp}
			});
		};

		goState (pp) {
			window.checkPath(pp);
		}

	render() {
		console.log('routes', this.props.routes);
		const {pathName, blocked, topNav} = this.props.routes;
		return (
		<div>
			{topNav}
			{blocked}
		</div>
		        );
	}
};