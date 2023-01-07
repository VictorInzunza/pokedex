export const paginationLogic = (currentPage, pokemonsFilter) => {
    const pokemonsPerPage = 15

    let pokemonsInPage = []
    const sliceStart = (currentPage - 1) * pokemonsPerPage
    const sliceEnd = currentPage * pokemonsPerPage
    pokemonsInPage = pokemonsFilter.slice(sliceStart, sliceEnd)

    const arrayPages = []
    const quantityPages = Math.ceil(pokemonsFilter.length / pokemonsPerPage)
    for (let i = 1; i <= quantityPages; i++) {
        arrayPages.push(i)
    }

    const lastPage = arrayPages[arrayPages.length - 1]

    let pagesInBlock = []
    const pagesPerBLock = 5
    let actualBlock = 1
    for (let currentBlock = 1; currentBlock * pagesPerBLock < currentPage; currentBlock++) {
        actualBlock = currentBlock + 1
    }
    const minPage = actualBlock * pagesPerBLock - pagesPerBLock
    for (let currentPageInBlock = actualBlock * pagesPerBLock; currentPageInBlock > minPage; currentPageInBlock--) {
        if (currentPageInBlock <= lastPage) {
            pagesInBlock.unshift(currentPageInBlock)
        }
    }
    return { pagesInBlock, lastPage, pokemonsInPage }
} 