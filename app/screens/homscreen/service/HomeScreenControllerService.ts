export default class HomeScreenControllerService {
    public static current = new HomeScreenControllerService();

    public getEmojieFromCountryCode(code: string): string {
        return code
            .toUpperCase()
            .split("")
            .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
            .join("");
    }

    public healthCheck(): boolean {
        return true;
    }
}
