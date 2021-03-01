import React from 'react'

import './List.css'
import ListItem from './ListItem/ListItem'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import { ComposedCurrency } from '../../models/ComposedCurrency'

type ListProps = { currencyList: Array<ComposedCurrency> }

const List = ({ currencyList }: ListProps): JSX.Element => (
  <div className="listWrapper">
    <ErrorBoundary>
      <table className="currencyListTable">
        <tbody>
          {currencyList.map((currency: ComposedCurrency) => (
            <ListItem key={JSON.stringify(currency)} currencyFull={currency} />
          ))}
        </tbody>
      </table>
    </ErrorBoundary>
  </div>
)

export default List
