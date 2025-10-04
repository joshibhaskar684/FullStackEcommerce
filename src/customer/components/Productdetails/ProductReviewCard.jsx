import React from 'react'
import { Avatar, Box, Grid, Rating } from '@mui/material'
function ProductReviewCard() {
    return (
        <div className=''>
            <Grid container spacing={2} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar  className='text-white' sx={{width:56,height:56,bgcolor:"#9155fd"}} >
                        R</Avatar>
                    </Box>
                </Grid>
                 <Grid item xs={9}>
                  <div className='space-y-2'>
                   <div>
                        <p  className='text-lg font-semibold'>
                            Ram
                        </p>
                        <p className='opacity-70'>
                          11 jan 2025
                        </p>
                        
                        </div>
                    
                  </div>
                   <Rating name="half-rating" value={4.5} readOnly precision={0.5}  />
        <p>
          vhvhvhhgghvv     wwwwwwwwwryywrbcwcvbyrtbtytrvgbh     </p> 
                </Grid>
              
            </Grid>
        </div>
    )
}

export default ProductReviewCard;