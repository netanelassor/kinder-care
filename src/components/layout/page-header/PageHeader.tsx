type PageHeaderProps = {
  title: string;
};
export default function PageHeader({ title }: PageHeaderProps): JSX.Element {
  return (
    <div className="flex p-2 text-start">
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
}
