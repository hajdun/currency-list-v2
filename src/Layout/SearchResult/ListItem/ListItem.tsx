import React from 'react'

import './ListItem.css'

import { ComposedCurrency } from '../../../models/ComposedCurrency'

import Flag from './Flag'
import CurrencyName from './CurrencyName'
import ExchangeRate from './ExchangeRate'
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary'

type ListItemProps = { currencyFull: ComposedCurrency }

const ListItem = ({ currencyFull }: ListItemProps): JSX.Element => (
  <ErrorBoundary>
    <tr className="listItem">
      <td className="flag">
        <Flag currencyFull={currencyFull} />
      </td>
      <td className="currencyName">
        <CurrencyName currencyFull={currencyFull} />
      </td>
      <td className="exchangeRate">
        <ExchangeRate currencyFull={currencyFull} />
      </td>
      <td className="eur">EUR</td>
    </tr>
  </ErrorBoundary>
)

export default ListItem
