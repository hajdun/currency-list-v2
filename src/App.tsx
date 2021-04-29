import React from 'react'

import './App.css'

import { chainedGetListRequest } from './api/routes'
import { Currency, ComposedCurrency } from './models/ComposedCurrency'
import { RouteComponentProps } from './models/RouterParams'

import PageTitle from './Layout/Header/PageTitle'
import Header from './Layout/Header/Header'
import List from './Layout/SearchResult/List'
import ErrorBoundary from './Layout/ErrorBoundary/ErrorBoundary'
import { filterForCurrency } from './SearchUtils/searchUtils'

interface IState {
  fullCurrenyList: Array<ComposedCurrency> | Array<Currency>
  currencyList: Array<ComposedCurrency> | Array<Currency>
}

interface IProps {
  filterOptions: string
}

class App extends React.Component<RouteComponentProps<IProps>, IState> {
  constructor(props: RouteComponentProps<IProps>) {
    super(props)
    this.state = {
      fullCurrenyList: [],
      currencyList: [],
    }
  }

  async componentDidMount(): Promise<void> {
    const currencyList = await chainedGetListRequest()
    this.setState(
      {
        fullCurrenyList: currencyList,
        currencyList,
      },
      () => {
        this.filterFromUrlParam()
      }
    )
  }

  performFiltering = (filterCondition: string): void => {
    this.setState((prevState) => ({
      currencyList: prevState.fullCurrenyList,
    }))

    if (filterCondition) {
      const filteredCurrencyList = filterForCurrency(filterCondition, this.state.fullCurrenyList)

      // filter
      this.setState({
        currencyList: filteredCurrencyList,
      })
    }
  }

  filterFromSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const filterCondition = event.target.value
    this.performFiltering(filterCondition)
  }

  filterFromUrlParam = (): void => {
    const { filterOptions } = this.props.match.params
    this.performFiltering(filterOptions)
  }

  render(): JSX.Element {
    const { currencyList } = this.state
    return (
      <ErrorBoundary>
        <PageTitle />
        <Header customFilter={this.filterFromSearch} />
        <List currencyList={currencyList} />
      </ErrorBoundary>
    )
  }
}

export default App
