export default function Spectate({ params } : { params: { id: string }}) {
  return (
    <p>Hello {params.id}</p>
  );
}
