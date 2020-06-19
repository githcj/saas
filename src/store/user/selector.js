export const getSecondChildrenList = state => {
    let orgList = state.userReducer.checkedList
    // orgList = JSON.parse(orgList)
    console.log(orgList,'selector')
    let secondList = []
    orgList.map(item => {
        item.children.map(lItem =>{
            secondList.push(lItem)
        })
    })
    return secondList
}


export const getLimitList = (arrList,startNum,endNum) => {
    let limitArr = arrList.filter( item =>{
        console.log(item)
        return (item.power_id < endNum) && (item.power_id > startNum)
    })

    return limitArr
}
