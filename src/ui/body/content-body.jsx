import React from 'react';

const ContentBody = ({children}) => {
    return (
        <section className="w-full flex-1 flex  flex-col shadows xl:px-16">
            {children}
        </section>
    );
}

export default ContentBody;
