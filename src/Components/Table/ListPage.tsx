import {Button, Stack, Typography} from '@mui/material'
import {Box} from '@mui/system'
import React, {Dispatch, SetStateAction, useState} from 'react'
import {DataProvider} from '../../Core/DataProvider'
import AddButton from '../Buttons/add'
import {Searchbar} from '../Input/Searchbar'
import {BaseModal} from '../Modal/BaseModal'
import EditIcon from '@mui/icons-material/Edit';
import CsvExportButton from '../../Pages/Logs/List/CsvExportButton'
import { LogsType } from '../../Pages/Logs/List/LogsList'
export function ListPage({
        setEditMode,
    
    listData,
    isCsvExport=false,
    isActiveEdit,
    header,
    searchText,
    searchField,
    setParams,
    params,
    filtersData,
    createModal,
    resource,
    defaultState,
    getList,
    noCreate,
    children,
    href,
    nofilter = false,
    setOpenModal
}: {
    setEditMode?:Dispatch<SetStateAction<"fee" | "referral" | null>>
    
    listData?:LogsType[]
    isCsvExport?:boolean
    header: string
    searchText: string
    searchField: string
    setParams: any
    params: any
    filtersData: any
    createModal?: any
    resource: string
    defaultState?: any
    getList: () => void
    href: string
    noCreate?: boolean
    children: React.ReactNode
    nofilter?: boolean
    isActiveEdit?:boolean
    setOpenModal?:Dispatch<SetStateAction<boolean>>
}) {
    const CreaterModal = createModal
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(defaultState)

    async function update() {
        if (data._id) {
            let result = await DataProvider.patch(`${resource}/${data._id}`, {data: data})
            if (result) {
                setOpen(false)
                getList()
            }
        }
    }
    // async function cancel() {
    //     if (data._id) {
    //         let result = await DataProvider.delete(`${resource}/${data._id}`)
    //     }
    //     setOpen(false)
    // }

    // useEffect(() => {
    //     if (open) {
    //         create()
    //     }
    // }, [open])
    return (
        <Box>
            {open && (
                <BaseModal
                    open={open}
                    setOpen={setOpen}
                    title={'Add to ' + header}
                    onClose={() => setOpen(false)}
                >
                    <CreaterModal open={open} setOpen={setOpen} data={data} setData={setData} />
                    <Stack direction="row" margin={'10px 0px'} spacing={2}>
                        <Button
                            variant="contained"
                            onClick={update}
                            size="large"
                            sx={{fontSize: '20px'}}
                        >
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setOpen(false)}
                            size="large"
                            color="secondary"
                            sx={{fontSize: '20px'}}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </BaseModal>
            )}
            <Stack alignItems={'center'} padding="10px">
                <Stack
                    direction="row"
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={noCreate ? 1 : 0}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: {
                                xs: '16px !important',
                                sm: '18px !important',
                            },
                            '@media (max-width: 350px)': {
                                fontSize: '15px !important',
                            },
                            fontWeight: 600,
                        }}
                    >
                        {header}
                    </Typography>

                   <Stack direction={'row'} alignItems={'center'} gap={1}>
                     {noCreate ? null : (
                        <AddButton
                            href={href}
                            text={'جدید'}
                            sx={{
                                fontSize: {
                                    xs: '14px',
                                    sm: '18px',
                                },
                                padding: '7px 13px',
                            }}
                        />
                    )}
                    {
                        isActiveEdit &&   <>
                        <Button variant="outlined" color="primary" onClick={()=>{
                            setOpenModal&&setOpenModal(true)
                            setEditMode && setEditMode('fee')
                        }} startIcon={<EditIcon/>} sx={{
                                fontSize: {
                                    xs: '14px',
                                    sm: '18px',
                                },
                                padding: '7px 13px',
                            }}>
                      ویرایش کارمزد ها
                    </Button>
                    <Button variant="outlined" color="primary" onClick={()=>{
                        setOpenModal&&setOpenModal(true)
                        setEditMode&&setEditMode('referral')
                    }} startIcon={<EditIcon/>} sx={{
                                fontSize: {
                                    xs: '14px',
                                    sm: '18px',
                                },
                                padding: '7px 13px',
                            }}>
                      ویرایش سود 
                    </Button>
                        </>
                    }
                        {
                            isCsvExport && (
                                <CsvExportButton
                                exportType='table'
                                rowOptions={[5,10,25,50,100,250]}
      data={listData || []}
      fileName="logs.csv"
    />
                            )
                        }
                 
                   </Stack>
                </Stack>

                {!nofilter && (
                    <Searchbar
                        searchField={searchField}
                        setParams={setParams}
                        filtersData={filtersData ?? []}
                        noFilters={filtersData ? false : true}
                        params={params}
                    />
                )}
            </Stack>
            <Stack minHeight={'60vh'}>{children}</Stack>
        </Box>
    )
}
