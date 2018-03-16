import React, { Component } from 'react';
import HomeNav from './HomeNav';
import HomeNavContent from './HomeNavContent';
import HomeHotList from './HomeHotList';

export default class Home extends Component {
    render() {
        return (
            <div className="m-home">
                <div className="m-tabarea m-tabarea-index">
                    <HomeNav />
                    <HomeNavContent />
                </div>
            </div>
        );
    }
}