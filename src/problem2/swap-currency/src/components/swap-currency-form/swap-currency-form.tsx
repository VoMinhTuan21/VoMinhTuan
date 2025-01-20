import { Button, Flex, Form, FormProps, Input, InputNumber, Select, Space } from "antd";
import styles from "./swap-currency-form.module.scss";
import MySelect from "../my-select/my-select";

type FieldType = {
	amount: number;
	from: string;
	to: string;
};

export default function SwapCurrencyForm() {
	const options = [
		{
			value: "ZIL",
			label: "ZIL",
			icon: "/images/tokens/ZIL.svg",
		},
		{
			value: "ATOM",
			label: "ATOM",
			icon: "/images/tokens/ATOM.svg",
		},
		{
			value: "BLUR",
			label: "BLUR",
			icon: "/images/tokens/BLUR.svg",
		},
	];

	const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
		console.log("Success:", values);
	};

	return (
		<div className={styles["swap-currency-form__container"]}>
			<h4 className={styles["swap-currency-form__title"]}>Swap Currency</h4>
			<Form onFinish={onFinish} className={styles["swap-currency-form__form"]} layout="vertical">
				<Form.Item<FieldType>
					label="Amount"
					name="amount"
					rules={[{ required: true, message: "This field is required" }]}
				>
					<InputNumber style={{ width: "100%" }} min={0} />
				</Form.Item>
				<div className={styles["swap-currency-form__form--tokens"]}>
					<Form.Item<FieldType>
						label="From"
						name="from"
						rules={[{ required: true, message: "This field is required" }]}
					>
						<MySelect options={options} />
					</Form.Item>
					<Form.Item<FieldType> label="To" name="to" rules={[{ required: true, message: "This field is required" }]}>
						<MySelect options={options} />
					</Form.Item>
				</div>
				<Button htmlType="submit" type="primary" block>
					Exchange now!
				</Button>
			</Form>
		</div>
	);
}
