import React from 'react'

function AddressCard({address}) {
  return (
    <div> 
        <div className='space-y-3   flex items-start justify-between mb-5 flex-col' >
            <p className='font-semibold'>{address?.firstname} {}{address?.lastname}</p>
            <p >
              {address?.streetAddress} {address?.address} {address?.city} {address?.state}  {address?.zipCode}
            </p>
            <div className="space-y-1">
                <p className='font-semibold'>Phone:</p>
                <p> {address?.mobile}</p>

            </div>
        </div>

    </div>
  )
}

export default AddressCard;