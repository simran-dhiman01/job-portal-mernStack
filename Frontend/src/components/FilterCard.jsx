import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'


const filterData = [
    {
        filterType: "Location",
        array: ["Gurgaon", "Bangalore", "Hyderabad", "Pune", "Mumbai" , "Chennai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Analytics" ,"DevOps Engineer", "Cyber Security Engineer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42k - 1lpa", "1lpa - 5lpa" ,"5lpa - 10lpa ", "above 10lpa"]
    },
]
const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        //console.log(selectedValue)
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
  return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
  )
}

export default FilterCard
