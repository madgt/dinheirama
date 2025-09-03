export default function DropDown({
  id,
  value,
}: {
  id: number | string;
  value: string;
}) {
  return (
    <option key={id} value={value}>
      {value}
    </option>
  );
}
