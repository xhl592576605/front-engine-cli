import { IConf } from '../interface/config'
import IRemoteGit from '../interface/remote-git'
import DataMatch from '../utils/data-match'
import axios from 'axios'
export default class Direct implements IRemoteGit {
	conf: IConf
	options: any
	dataMatch: DataMatch
	tokenObject?: Record<string, string>
	constructor(conf: IConf) {
		this.dataMatch = new DataMatch()
		this.conf = conf
		if (this.conf.options) {
			this.options = JSON.parse(this.conf.options)
		}
		if (this.conf.tokenKey && this.conf.token) {
			this.tokenObject = {
				[this.conf.tokenKey]: this.conf.token
			}
		}
	}

	async getOrgRepos(name: string) {
		let orgsApi = await this.options.orgRepos
		if (!orgsApi) {
			throw new Error('options no has orgRepos')
		}
		orgsApi = this.dataMatch.$matchData4String(orgsApi, { name })
		const response = await axios.get(`${this.conf.api}${orgsApi}`, {
			headers: Object.assign({}, this.tokenObject)
		})
		const { data = [] } = response || {}
		return data.map((x) => ({ name: x.name, value: `${x.name}|${x.id}` }))
	}

	async getUserRepos(name: string) {
		let userApi = await this.options.userRepos
		if (!userApi) {
			throw new Error('options no has userRepos')
		}
		userApi = this.dataMatch.$matchData4String(userApi, { name })
		const response = await axios.get(`${this.conf.api}${userApi}`, {
			headers: Object.assign({}, this.tokenObject)
		})
		const { data = [] } = response || {}
		return data.map((x) => ({ name: x.name, value: `${x.name}|${x.id}` }))
	}

	async getOrgBranches(group: string, repos: string) {
		let orgBranchApi = await this.options.orgBranches
		if (!orgBranchApi) {
			throw new Error('options no has orgBranches')
		}
		const [repo, id] = repos.split('|')
		orgBranchApi = this.dataMatch.$matchData4String(orgBranchApi, {
			name: group,
			repo,
			id
		})
		const response = await axios.get(`${this.conf.api}${orgBranchApi}`, {
			headers: Object.assign({}, this.tokenObject)
		})
		const { data = [] } = response || {}
		return data.map((x) => x.name)
	}

	async getUserBranches(group: string, repos: string) {
		let userBranchApi = await this.options.userBranches
		if (!userBranchApi) {
			throw new Error('options no has userBranches')
		}
		const [repo, id] = repos.split('|')
		userBranchApi = this.dataMatch.$matchData4String(userBranchApi, {
			name: group,
			repo,
			id
		})
		const response = await axios.get(`${this.conf.api}${userBranchApi}`, {
			headers: Object.assign({}, this.tokenObject)
		})
		const { data = [] } = response || {}
		return data.map((x) => x.name)
	}

	async getOrgTags(group: string, repos: string) {
		let orgTagApi = await this.options.orgTags
		if (!orgTagApi) {
			throw new Error('options no has orgTags')
		}
		const [repo, id] = repos.split('|')
		orgTagApi = this.dataMatch.$matchData4String(orgTagApi, {
			name: group,
			repo,
			id
		})
		const response = await axios.get(`${this.conf.api}${orgTagApi}`, {
			headers: Object.assign({}, this.tokenObject)
		})
		const { data = [] } = response || {}
		return data.map((x) => x.name)
	}

	async getUserTags(group: string, repos: string) {
		let userTagApi = await this.options.userTags
		if (!userTagApi) {
			throw new Error('options no has userTags')
		}
		const [repo, id] = repos.split('|')
		userTagApi = this.dataMatch.$matchData4String(userTagApi, {
			name: group,
			repo,
			id
		})
		const response = await axios.get(`${this.conf.api}${userTagApi}`, {
			headers: Object.assign({}, this.tokenObject)
		})
		const { data = [] } = response || {}
		return data.map((x) => x.name)
	}
}
