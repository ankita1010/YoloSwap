import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import React, { Component } from 'react';
import './../../assets/scss/index.scss';

export default class App extends Component {
  changeRouteParams = (srcSymbol, destSymbol) => {
	const currentUrl = this.props.history.location.pathname.split('/')[2];
    this.props.history.push(`/swap/${currentUrl}/${srcSymbol.toLowerCase()}-${destSymbol.toLowerCase()}`);
  };

  render() {
	const { match, match: {params}} = this.props;
	const isNewStyling = match.url.includes('yolo2');
    return (
      <div className={`${isNewStyling ? 'dark-theme' : ''}`}>
        <Header/>
        <Body
          srcSymbolParam={params.srcSymbol}
          destSymbolParam={params.destSymbol}
          changeRouteParams={this.changeRouteParams}
        />
        <Footer/>
      </div>
    )
  }
}
