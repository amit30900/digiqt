import React, { useState } from 'react'

import { Button, TextField, Typography, Dialog, DialogActions, DialogContent, Select, DialogTitle, MenuItem } from '@material-ui/core';
import styled from 'styled-components'

import axios from '../axiosInstance';

const Main = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
`

const Container = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
`

const Set = styled.div`
    display:flex;
    align-items:center;
    margin:10px 0;
    min-width:300px;
    padding:0 10px;
`

const InfoSet = styled.div`
     display:flex;
    margin-bottom:5px;
    min-width:300px;
    padding:0 10px;
`

const DataContainer = styled.div`
    display:flex;
    align-items:center;
    width:900px;
    margin:10px 0;
    background-color:"gray";
    padding:10px;
`
const DataSet = styled.div`
    display:flex;
    width:800px;
    align-items:flex-start;
    flex-direction:column;
`

const Anchor = styled.a`
    text-decoration:none;
    display:flex;
    padding:5px;
    align-items:center;
    cursor:pointer;
`

const Image = styled.img`
    object-fit:contain;
    width:300px;
    height:200px;
`

const Title = styled.h5`
    font-size:1rem;
    font-weight:500;
    min-width:100px;
`
const Info = styled.p`
    font-size:0.9rem;
    padding:10px;
    padding-top:${props => props.top ? props.top : "0px"};
`

let date = new Date()
let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()

const News = () => {

    const [search, setSearch] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [filtered, setFiltered] = useState([])
    const [isFilter, setIsFilter] = useState(false)
    const [error, setError] = useState(false)
    const [from, setfrom] = useState(`${month}/${day}/${year}`)
    const [to, setTo] = useState(`${month}/${day}/${year}`)
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('publishedAt');
    const [datas, setDatas] = useState([])
    const [open, setOpen] = React.useState(false);

    console.log(datas)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleSearch = () => {

        if (keyword === "") {
            setError(true)
            setDatas([])
        }
        else {
            axios.get(`top-headlines?q=${keyword}&pageSize=100&apiKey=${process.env.REACT_APP_API_KEY}`).then((res) => {
                setDatas(res.data.articles)
                setSearch(true)
                setIsFilter(false)
            }).catch(err => console.log(err))
            setError(false)
        }
    }

    console.log(to)

    return (
        <>
            <Typography style={{ marginTop: "10px", fontWeight: "600" }} align="center" variant="h5" color="primary">
                Welcome To News World
            </Typography>

            <Main>
                <Container>
                    <Set>
                        <Container>
                            <TextField value={keyword} style={{ margin: "10px" }}
                                error={error}
                                onChange={(e) => setKeyword(e.target.value)}
                                label="Key Word" variant="outlined" />
                            {error && (<p style={{ color: "red" }}>Filled Should not be empty.</p>)}
                        </Container>
                        <Button onClick={handleSearch} variant="contained" color="primary">
                            Search
                    </Button>
                        {search && (<Button onClick={handleClickOpen} style={{ margin: "0 10px" }} variant="outlined">
                            Filter
                        </Button>)}
                        {search && (<Button onClick={() => {
                            setKeyword('')
                            setCategory('')
                            setfrom(`${month}/${day}/${year}`)
                            setTo(`${month}/${day}/${year}`)
                            setSortBy('publishedAt')
                            setSearch(false)
                            setDatas([])
                            setFiltered([])
                        }} style={{ margin: "0 10px" }} variant="outlined" color="secondary">
                            Reset
                        </Button>)}
                    </Set>

                    {search && !isFilter &&
                        (<>
                            {datas.map(data => (
                                <DataContainer key={data.publishedAt}>
                                    <DataSet>
                                        <InfoSet>
                                            <Title>
                                                Author:
                                        </Title>
                                            <Info>
                                                {data.author ? data.author : "UnKnown"}
                                            </Info>
                                        </InfoSet>
                                        <InfoSet>
                                            <Title>
                                                Title:
                                        </Title>
                                            <Info >
                                                {data.title}
                                            </Info>
                                        </InfoSet>
                                        <InfoSet>
                                            <Title>
                                                Description:
                                        </Title>
                                            <Info >
                                                {data.description}
                                            </Info>
                                        </InfoSet>
                                        <InfoSet>
                                            <Title>
                                                Published At:
                                        </Title>
                                            <Info >
                                                {data.publishedAt}
                                            </Info>
                                        </InfoSet>

                                    </DataSet>
                                    <DataSet>
                                        <Anchor href={data.urlToImage} target="blank">
                                            <Image src={data.urlToImage} alt="news" />
                                        </Anchor>
                                        <Anchor href={data.url} target="blank">
                                            Read More
                                    </Anchor>
                                    </DataSet>
                                </DataContainer>
                            ))}
                        </>)}

                    {isFilter &&
                        (<>
                            {filtered.map(data => (
                                <DataContainer key={data.publishedAt}>
                                    <DataSet>
                                        <InfoSet>
                                            <Title>
                                                Author:
                                </Title>
                                            <Info>
                                                {data.author ? data.author : "UnKnown"}
                                            </Info>
                                        </InfoSet>
                                        <InfoSet>
                                            <Title>
                                                Title:
                                </Title>
                                            <Info >
                                                {data.title}
                                            </Info>
                                        </InfoSet>
                                        <InfoSet>
                                            <Title>
                                                Description:
                                </Title>
                                            <Info >
                                                {data.description}
                                            </Info>
                                        </InfoSet>
                                        <InfoSet>
                                            <Title>
                                                Published At:
                                </Title>
                                            <Info >
                                                {data.publishedAt}
                                            </Info>
                                        </InfoSet>

                                    </DataSet>
                                    <DataSet>
                                        <Anchor href={data.urlToImage} target="blank">
                                            <Image src={data.urlToImage} alt="news" />
                                        </Anchor>
                                        <Anchor href={data.url} target="blank">
                                            Read More
                            </Anchor>
                                    </DataSet>
                                </DataContainer>
                            ))}
                        </>)}

                    {search && datas.length < 1 &&
                        (<p>
                            No data Found
                        </p>)
                    }
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Filter</DialogTitle>
                        <DialogContent>
                            <InfoSet>
                                <Title>
                                    Category
                                </Title>
                                <Select
                                    value={category}
                                    onChange={handleCategory} >
                                    <MenuItem value="business">Business</MenuItem>
                                    <MenuItem value="entertainment">Entertainment</MenuItem>
                                    <MenuItem value="general">General</MenuItem>
                                    <MenuItem value="health">Health</MenuItem>
                                    <MenuItem value="science">Science</MenuItem>
                                    <MenuItem value="sports">Sports</MenuItem>
                                    <MenuItem value="technology">Technology</MenuItem>
                                </Select>

                            </InfoSet>
                            <Title>
                                From
                            </Title>
                            <TextField
                                type="date"
                                defaultValue={from}
                                onChange={(e) => setfrom(e.target.value)}
                                fullWidth
                            />
                            <Title>
                                To
                            </Title>
                            <TextField
                                type="date"
                                defaultValue={to}
                                onChange={(e) => setTo(e.target.value)}
                                fullWidth
                            />
                            <InfoSet>
                                <Title>
                                    Sort BY
                            </Title>
                                <Select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)} >
                                    <MenuItem value="relevancy">Relevancy</MenuItem>
                                    <MenuItem value="popularity">Popularity</MenuItem>
                                    <MenuItem value="publishedAt">PublishedAt</MenuItem>
                                </Select>
                            </InfoSet>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                axios.get(`top-headlines?q=${keyword}&category=${category}&from=${from}&to=${to}&pageSize=100&sortBy=${sortBy}&apiKey=${process.env.REACT_APP_API_KEY}`).then((res) => {
                                    setFiltered(res.data.articles)
                                    setIsFilter(true)
                                    setOpen(false)
                                }).catch(err => console.log(err))
                            }} color="primary">
                                Submit
                            </Button>
                            <Button onClick={() => {
                                setCategory('')
                                setfrom(`${month}/${day}/${year}`)
                                setTo(`${month}/${day}/${year}`)
                                setSortBy('publishedAt')
                            }} color="primary">
                                Reset
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Main>
        </>
    )
}

export default News
