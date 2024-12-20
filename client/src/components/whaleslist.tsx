import React from 'react'

const Whaleslist: React.FC<{
    gridArea: string;
  }> = ({
    gridArea
  }) =>   {
  return (
    <div className="p-4 flex justify-center items-center min:h-[100px] w-full shadow-xl shadow-black bg-blak rounded-lg" style={{gridArea: gridArea}}>
        <div className="w-full h-full  text-white">
            <h4 className='font-semibold text-md py-2'>Whalelist</h4>
            <div className='text-sm text-white/80 font-light flex flex-col gap-3 '>
                <p>Basil Goodluck</p>
                <p>Noble</p>
                <p>Dabere</p>
                <p>Goodnews</p>
                <p>Gift</p>
                <p>Favour</p>
            </div>
        </div>

    </div>
  )
}

export default Whaleslist