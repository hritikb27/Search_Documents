import { DocumentInterface } from "../interfaces/ItemInterface";
import Highlighter from "react-highlight-words";

type RenderDocsProps = {
    docs: DocumentInterface[],
    query: string
}

const RenderDocs = ({ docs, query }: RenderDocsProps) => {
    return (
        <div className="w-full sm:w-[60%] divide-y">
            {docs.map((doc) => (
                <div key={doc.id} className='text-black'>
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[query]}
                        autoEscape={true}
                        textToHighlight={doc.name}
                        className="font-bold text-2xl"
                    />
                    {/* <h2 className="font-bold text-2xl">{doc.name}</h2> */}
                    <br/>
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[query]}
                        autoEscape={true}
                        textToHighlight={doc.content.length > 600 ? doc.content.substring(0, 600) + '...' : doc.content}
                    />
                    {/* <p>{doc.content.length > 500 ? doc.content.substring(0, 500) + '...' : doc.content}</p> */}
                    <hr
                        className="my-12 h-0.5 border-t-0 bg-neutral-400 opacity-100 dark:opacity-50" />
                </div>
            ))}
        </div>
    )
}

export default RenderDocs;