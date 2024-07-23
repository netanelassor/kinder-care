import "./ErrorBlock.scss";

type ErrorProps = {
  title: string;
  message: string;
};
export default function ErrorBlock({ title, message }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <div className="error-block">
          <div className="error-block-icon">!</div>
          <div className="error-block-text">
            <h2>{title}</h2>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
