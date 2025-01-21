import { Button, Form, FormProps, InputNumber, notification } from "antd";
import { useEffect, useState } from "react";
import swapCurrencyService from "../../services/swap-currency.service";
import MySelect, { Option } from "../my-select/my-select";
import styles from "./swap-currency-form.module.scss";
type FieldType = {
	amount: number;
	from: string;
	to: string;
};

export default function SwapCurrencyForm() {
	const [options, setOptions] = useState<Option[]>([]);
	const [result, setResult] = useState<number>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form] = Form.useForm<FieldType>();
	const [api, _] = notification.useNotification();

	const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
		try {
			setIsSubmitting(true);
			setTimeout(async () => {
				const response = await swapCurrencyService.exchange(values);
				setResult(response.data);
				setIsSubmitting(false);
			}, 1000);
		} catch (error) {
			api['error']({
				message: "Error",
				description: "An error happened. Please contact the owner of the web"
			})
			setIsSubmitting(false);
		}
	};

	const resultText = () => {
		return `${form.getFieldValue("amount")} ${form.getFieldValue("from")} = ${result} ${form.getFieldValue("to")}`;
	};

	useEffect(() => {
		swapCurrencyService.getAllCurrency().then((data) => {
			setOptions(
				data.data.map((item) => ({
					label: item,
					value: item,
					icon: `/images/tokens/${item}.svg`,
				}))
			);
		});
	}, []);

	return (
		<div className={styles["swap-currency-form__container"]}>
			<h4 className={styles["swap-currency-form__title"]}>Swap Currency</h4>
			<Form form={form} onFinish={onFinish} className={styles["swap-currency-form__form"]} layout="vertical">
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
				{isSubmitting ? (
					<Form.Item>
						<span className={styles["swap-currency-form__form--result"]}>We are calculating...</span>
					</Form.Item>
				) : (
					result !== undefined && (
						<Form.Item>
							<span className={styles["swap-currency-form__form--result"]}>{resultText()}</span>
						</Form.Item>
					)
				)}
				<Button htmlType="submit" type="primary" block loading={isSubmitting}>
					Exchange now!
				</Button>
			</Form>
		</div>
	);
}
