import React from 'react'
import { SaleProductsSectionComplete } from './saleproduct'
import GoingFastSection from './goingfast'

export default function elesection() {
  return (
    <div className="flex justify-center items-center gap-5">

        <SaleProductsSectionComplete/>
        <GoingFastSection/>
    </div>
  )
}
