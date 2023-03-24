import { Post } from './Review';

interface HistoryProps {
  history: ArticleType[]|null;
}

export function HistoryContainer({ history }: HistoryProps) {
  return (
    <>
      {history && (
        <div className='post'>
          {history.map((ele: any) => (
            <Post key={ele.id} data={ele} />
          ))}
        </div>
      )}
    </>
  );
}
