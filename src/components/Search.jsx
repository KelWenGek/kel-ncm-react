import React, { Component } from 'react'
import SearchDefaultComp from '@/components/SearchDefault'
import SearchInputComp from '@/components/SearchInput'
import SearchSuggestComp from '@/components/SearchSuggest'
import SearchResultComp from '@/components/SearchResult'

export default class SearchComp extends Component {
    render() {
        return (
            <div className="m-hmsrch">
                <SearchInputComp />
                <SearchDefaultComp />
                <SearchSuggestComp />
                <SearchResultComp />
            </div>
        )
    }
}
