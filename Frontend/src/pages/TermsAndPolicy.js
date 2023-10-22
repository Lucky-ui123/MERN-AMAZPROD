import React from 'react'
import Meta from './Meta'
import BreadCrumb from './BreadCrumb'
import Container from '../components/Container'

const TermsAndPolicy = () => {
  return (
    <>
        <Meta title={'Terms And Conditions'} />
        <BreadCrumb title={'Terms And Conditions'} />
        <Container class1="policy-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="policy"></div>
                    </div>
                </div>
        </Container>

    </>
  )
}

export default TermsAndPolicy