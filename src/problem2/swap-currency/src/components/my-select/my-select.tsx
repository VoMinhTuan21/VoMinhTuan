import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import styles from "./my-select.module.scss";

type Option = {
	label: string;
	value: string;
	icon: string;
};

interface Props {
	options: Option[];
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
	id?: string;
	[index: string]: any;
}

const MySelect: React.FC<Props> = (props) => {
	const { placeholder = "Select an item", options, id, value, onChange, ...rest } = props;

	const [listOptions, setListOptions] = useState<Option[]>(options);
	const [selected, setSelected] = useState<Option>();
	const [showList, setShowList] = useState(false);
	const [search, setSearch] = useState("");

	const ref = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setShowList(false);
		}
	};

	const handleOpenList = () => {
		setShowList(true);
		setTimeout(() => {
			inputRef.current?.focus();
		}, 500);
	};

	const handleClickItem = (opt: Option) => () => {
		setSelected(opt);
		setShowList(false);
		onChange?.(opt.value);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (value) {
			setSelected(options.find((item) => item.value === value) ?? undefined);
		}
	}, [value]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setListOptions(options.filter((opt) => opt.label.toLowerCase().includes(search)));
		}, 500);

		return () => clearTimeout(timer);
	}, [search]);

	return (
		<div
			id={id}
			ref={ref}
			className={clsx(
				styles["my-select__container"],
				showList && rest["aria-invalid"] && styles["my-select__container--invalid"],
				showList && !rest["aria-invalid"] && styles["my-select__container--active"]
			)}
			{...rest}
		>
			<div className={styles["my-select"]} onClick={handleOpenList}>
				{showList ? (
					<input
						ref={inputRef}
						onClick={(e) => {
							e.stopPropagation();
						}}
						onChange={(event) => setSearch(event.target.value)}
						className={styles["my-select__input"]}
					/>
				) : selected ? (
					<div className={styles["my-select__selected-item"]}>
						<img src={`/images/tokens/${selected.value}.svg`} alt={selected.label} />
						{selected.label}
					</div>
				) : (
					<span className={styles["my-select__placeholder"]}>{placeholder}</span>
				)}
			</div>
			{showList ? (
				<SearchOutlined className={styles["my-select__suffix-icon"]} />
			) : (
				<DownOutlined className={styles["my-select__suffix-icon"]} />
			)}
			<ul className={clsx(styles["my-select__list"], showList && styles["my-select__list--show"])}>
				{listOptions.map((opt, index) => (
					<li
						onClick={handleClickItem(opt)}
						key={index}
						className={clsx(styles["item"], selected?.value === opt.value && styles["item--active"])}
					>
						<img src={`/images/tokens/${opt.value}.svg`} alt={opt.label} />
						{opt.label}
					</li>
				))}
			</ul>
		</div>
	);
};

export default MySelect;
