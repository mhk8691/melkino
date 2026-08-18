import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import SearchIcon from '@mui/icons-material/Search'
import {Box, Button, Collapse, Divider, IconButton, InputBase, Stack} from '@mui/material'
import {useState} from 'react'
import {CustomFilter} from '../Filter/CustomFilter'

export function Searchbar(props) {
    const {filtersData, setParams, searchField, placeholder, noFilters, params} = props
    const [filterIn, setFilterIn] = useState(params.filter)
    const [textFieldData, setTextfieldData] = useState('')
    const handleFilterIn = () => {
        setFilterIn(!filterIn)
    }
    const handleChange = (event) => {
        const value = event.target.value
        setTextfieldData(value)
        setParams((filter) => {
            const newFilter = {...filter}

            if (value === null) {
                delete newFilter.search
            } else {
                newFilter.search = value
            }

            if (!newFilter.ordering) {
                delete newFilter.ordering
            }

            return newFilter
        })
    }
    return (
        <Box width="100%" mt={3}>
        
            {!noFilters && (
                    <CustomFilter filtersData={filtersData} setParams={setParams} params={params} />
            )}
        </Box>
    )
}
